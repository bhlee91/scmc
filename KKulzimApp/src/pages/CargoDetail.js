import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import {Card, Title, Divider, Paragraph, Chip} from 'react-native-paper';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import ScrollLoadingIndicatorView from 'components/ScrollLoadingIndicatorView';

import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer'; //사이즈가 커 리사이징 필요

import { isEmpty, formatFare } from "utils/CommonUtil";
import { formatDateTimeToKorea } from "utils/DateUtil";
import {
  getCargoRequestDetail,
  setCargoRequestDetail
} from "api/cargo/index";

function CargoDetail({ navigation, route }) {
  const { Popover } = renderers

  const [loading, setLoading] = useState(false)
  const [cargo, setCargo] = useState({
    images: []
  })
  const [lmFiles, setLmFiles] = useState([])
  const [umFiles, setUmFiles] = useState([])
  const [cargoThumbnail, setCargoThumbnail] = useState("")

  useEffect(() => {
    const handleBackPress = () => {
      navigation.navigate(route.params.p)

      return true
    }

    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress)

    return () => backHandler.remove();
  }, [])

  useEffect(() => {
    getCargoRequestDetail(route.params.reqId)
    .then(res => {
      if (res.data !== null) {
        if (res.data.cargoImages.length > 0) {
          setCargoThumbnail(res.data.cargoImages[0])
        }

        if (res.data.loadImages.length > 0) {
          setLmFiles(res.data.loadImages)
        }

        if (res.data.unloadImages.length > 0) {
          setUmFiles(res.data.unloadImages)
        }

        setCargo(res.data)
        setLoading(() => true)
      }
    })
  }, [route.params?.reqId])

  const onResponse = useCallback(async (response, d, i) => {
    const orientation = response.exif?.Orientation

    return ImageResizer.createResizedImage(
      response.path, //파일의 경로 file://안드로이드 경로
      600, //width
      600, //height
      response.mime.includes('jpeg') ? 'JPEG' : 'PNG',
      100, // 사진의 품질
      0, // rotation
    )
    .then(r => {
      console.log(r)
      console.log(
        '리사이징 : ' + r.uri,
        '이름 : ' + r.name,
        '타입 : ' + response.mime,
      )
    })
    .then(() => {
      console.log(response)
      console.log(d)
      console.log(i)
      handleImageFiles(d, i, response)
    })
    .catch(err => {
      console.log('리사이즈 에러 + ' + err)
      ImagePicker.clean()
    })
  }, [])

  const onTakePhoto = useCallback(async (d, i) => {

    return await ImagePicker.openCamera({
      includeBase64: true, //미리 보기 표시를 위해
      includeExif: true, //카메라 찍는 방향
      saveToPhotos: true,
    })
    .then(r => onResponse(r, d, i))
    .catch(e => {
      console.log('카메라 에러 ==> ' + e)
    })
  }, [onResponse])

  const onChangeFile = useCallback(() => {
    return ImagePicker.openPicker({
      includeExif: true,
      includeBase64: true,
      mediaType: 'photo',
    })
    .then(onResponse)
    .catch(console.log)
  }, [onResponse])

  // const onComplete = useCallback(async () => {
  //   if (!image) {
  //     Alert.alert('알림', '파일을 업로드해주세요.');
  //     return;
  //   }
  //   if (!orderId) {
  //     Alert.alert('알림', '유효하지 않은 주문입니다.');
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append('image', image);
  //   formData.append('orderId', orderId);
  //   try {
  //     await axios.post(`${Config.API_URL}/complete`, formData, {
  //       headers: {
  //         authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     Alert.alert('알림', '완료처리 되었습니다.');
  //     navigation.goBack(); //완료 처리 화면을 다시 오지 않게 하기 위해
  //     navigation.navigate('MyInfo');
  //     dispatch(orderSlice.actions.rejectOrder(orderId));
  //   } catch (error) {
  //     const errorResponse = (error as AxiosError).response;
  //     if (errorResponse) {
  //       Alert.alert('알림', errorResponse.data.message);
  //     }
  //   }
  // }, [dispatch, navigation, image, orderId, accessToken]);

  const onAddImage = (d, i) => {
    onTakePhoto(d, i)
  }

  const onChangeLoadImageFiles = (i, response) => {
    file = {
      imageSeq: i,
      contents: `data:${response.mime};base64,${response.data}`,
      memDiv: "M02",
      methodDiv: "LM",
    }

    setLmFiles(prevFiles => {
      if (prevFiles.length === 0) {
        return [file]
      } else {
        let flag = false

        let newFiles = prevFiles.map(f => {
          if (f.imageSeq === i) {
            flag = true

            return { 
              ...f,
              imageSeq: file.imageSeq,
              contents: file.contents,
              memDiv: file.memDiv,
              methodDiv: file.methodDiv,
            }
          } 
        })

        if (flag) return [...newFiles]
        else return [...prevFiles, file]
      }
    })
  }

  const onChangeUnloadImageFiles = (i, response) => {
    file = {
      imageSeq: i,
      contents: `data:${response.mime};base64,${response.data}`,
      memDiv: "M02",
      methodDiv: "UM",
    }

    setUmFiles(prevFiles => {
      if (prevFiles.length === 0) {
        return [file]
      } else {
        let flag = false

        let newFiles = prevFiles.map(f => {
          if (f.imageSeq === i) {
            flag = true

            return { 
              ...f,
              imageSeq: file.imageSeq,
              contents: file.contents,
              memDiv: file.memDiv,
              methodDiv: file.methodDiv,
            }
          } 
        })

        if (flag) return [...newFiles]
        else return [...prevFiles, file]
      }
    })
  }

  const onDeleteImage = (d, i) => {
    switch(d) {
      case 'load':
        setLmFiles(prevFiles => {
          let files = prevFiles.filter(file => file.imageSeq !== i)
          files = files.map((file, index) => ({ ...file, imageSeq: index }))

          return files
        })
        break;
      case 'unload':
        setUmFiles(prevFiles => {
          let files = prevFiles.filter(file => file.imageSeq !== i)
          files = files.map((file, index) => ({ ...file, imageSeq: index }))

          return files
        })
        break;
    }
  }

  const handleImageFiles = (d, i, response) => {
    switch(d) {
      case 'load':
        onChangeLoadImageFiles(i, response)
        break;
      case 'unload':
        onChangeUnloadImageFiles(i, response)
        break;
    }
  }

  const handleCargoDetailSave = () => {
    const obj = {
      reqId: cargo.reqId,
      lmFiles: lmFiles,
      umFiles: umFiles,
    }

    setCargoRequestDetail(obj)
    .then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }]
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <ScrollLoadingIndicatorView loading={loading}>
      {/* 화물정보 */}
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
        <View style={{flex: 1}}>
          <Card style={styles.detailcard}>
            <Card.Content>
              <Title style={styles.title2}>화물정보</Title>
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderRadius: 4,
                  marginBottom: 5,
                  borderColor: '#E0E0E0',
                  backgroundColor: '#FFFFFF',
                }}>
                <Image
                  source={isEmpty(cargoThumbnail.contents) ? require('/assets/images/logo11.png'): { uri: cargoThumbnail.contents }}
                  style={{
                    width: 90,
                    height: 90,
                    resizeMode: 'cover',
                    marginLeft: 2,
                    marginRight: 8,
                  }}></Image>
                <View style={{flexDirection: 'column'}}>
                  <Chip
                    icon="information"
                    style={{
                      marginLeft: 40,
                    }}>
                    {cargo.statusName}
                  </Chip>
                  <Text style={styles.cargotitletext}>
                    크기 : <Text style={styles.cargotext}>{cargo?.cwidth}m x {cargo?.cverticalreal}m x {cargo?.cheight}</Text>
                  </Text>
                  <Text style={styles.cargotitletext}>
                    중량 : <Text style={styles.cargotext}>{cargo?.cweight}㎏</Text>
                  </Text>
                  <Text style={styles.cargotitletext}>
                    체적 : <Text style={styles.cargotext}>{(cargo?.cwidth * cargo?.cverticalreal * cargo?.cheight).toFixed(1)}㎥</Text>
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
      {/* 화물정보 끝 */}
      {/* 상차지 정보 */}
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
        <View style={{flex: 1}}>
          <Card style={styles.detailcard}>
            <Card.Content>
              <Title style={styles.title2}>상차지[최대 4개]</Title>
              <Paragraph>
                {formatDateTimeToKorea(cargo?.departDatetimes)}
              </Paragraph>
              <Paragraph>
                {cargo?.departAddrSt} {isEmpty(cargo?.departAddrSt2) ? "" : `(${cargo?.departAddrSt2})`}
              </Paragraph>
              <View
                style={{
                  height: lmFiles.length < 2 ? 120 : 250,
                  marginTop: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}>
                <View
                  style={{
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={{ width: 120, height: 120, borderWidth: 0.5 }}>
                    <Menu renderer={Popover} rendererProps={{ preferredPlacement: 'bottom' }}>
                      <MenuTrigger>
                        <Image
                          source={isEmpty(lmFiles[0]?.contents) ? require('/assets/images/logo11.png') : { uri: lmFiles[0].contents }}
                          style={{width: 120, height: 120}}
                        />
                      </MenuTrigger>
                      <MenuOptions style={{ padding: 20 }}>
                        <MenuOption 
                          onSelect={() => onAddImage('load', 0)}>
                          <Text style={{ color: 'black' }}>추가</Text>
                        </MenuOption>
                        <Text>{' '}</Text>
                        <MenuOption 
                          disabled={isEmpty(lmFiles[0]?.contents)}
                          onSelect={() => onDeleteImage('load', 0)}>
                          <Text style={{ color: 'black' }}>삭제</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </View>
                </View>
                {
                  lmFiles.length >= 1 ?
                  <View
                    style={{
                      flex: 1,
                      width: '50%',
                      marginLeft: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={{width: 120, height: 120, borderWidth: 0.5}}>
                      <Menu renderer={Popover} rendererProps={{ preferredPlacement: 'bottom' }}>
                        <MenuTrigger>
                          <Image
                            source={isEmpty(lmFiles[1]?.contents) ? require('/assets/images/logo11.png') : { uri: lmFiles[1].contents }}
                            style={{width: 120, height: 120}}
                          />
                        </MenuTrigger>
                        <MenuOptions style={{ padding: 20 }}>
                          <MenuOption 
                            onSelect={() => onAddImage('load', 1)}>
                            <Text style={{ color: 'black' }}>추가</Text>
                          </MenuOption>
                          <Text>{' '}</Text>
                          <MenuOption 
                            onSelect={() => onDeleteImage('load', 1)}>
                            <Text style={{ color: 'black' }}>삭제</Text>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
                    </View>
                  </View>
                  :
                  null
                }
                {
                  lmFiles.length >= 2 ? 
                  <View
                    style={{
                      marginTop: 10,
                      width: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={{width: 120, height: 120, borderWidth: 0.5}}>
                      <Menu renderer={Popover} rendererProps={{ preferredPlacement: 'bottom' }}>
                        <MenuTrigger>
                          <Image
                            source={isEmpty(lmFiles[2]?.contents) ? require('/assets/images/logo11.png') : { uri: lmFiles[2].contents }}
                            style={{width: 120, height: 120}}
                          />
                        </MenuTrigger>
                        <MenuOptions style={{ padding: 20 }}>
                          <MenuOption 
                            onSelect={() => onAddImage('load', 2)}>
                            <Text style={{ color: 'black' }}>추가</Text>
                          </MenuOption>
                          <Text>{' '}</Text>
                          <MenuOption 
                            onSelect={() => onDeleteImage('load', 2)}>
                            <Text style={{ color: 'black' }}>삭제</Text>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
                    </View>
                  </View>
                  :
                  null
                }
                {
                  lmFiles.length >= 3 ?
                  <View
                    style={{
                      flex: 1,
                      width: '50%',
                      marginLeft: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={{width: 120, height: 120, borderWidth: 0.5}}>
                      <Menu renderer={Popover} rendererProps={{ preferredPlacement: 'bottom' }}>
                        <MenuTrigger>
                          <Image
                            source={isEmpty(lmFiles[3]?.contents) ? require('/assets/images/logo11.png') : { uri: lmFiles[3].contents }}
                            style={{width: 120, height: 120}}
                          />
                        </MenuTrigger>
                        <MenuOptions style={{ padding: 20 }}>
                          <MenuOption 
                            onSelect={() => onAddImage('load', 3)}>
                            <Text style={{ color: 'black' }}>추가</Text>
                          </MenuOption>
                          <Text>{' '}</Text>
                          <MenuOption 
                            onSelect={() => onDeleteImage('load', 3)}>
                            <Text style={{ color: 'black' }}>삭제</Text>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
                    </View>
                  </View>
                  :
                  null
                }
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
      {/* 상차지 정보 끝 */}

      {/* 하차지 정보 */}
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
        <View style={{flex: 1}}>
          <Card style={styles.detailcard}>
            <Card.Content>
              <Title style={styles.title2}>하차지[최대 4개]</Title>
              <Paragraph>
                {formatDateTimeToKorea(cargo?.arrivalDatetimes)}
              </Paragraph>
              <Paragraph>
                {cargo?.arrivalAddrSt} {isEmpty(cargo?.arrivalAddrSt2) ? "" : `(${cargo?.arrivalAddrSt2})`}
              </Paragraph>
              <View
                style={{
                  height: 120,
                  marginTop: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={{width: 120, height: 120, borderWidth: 0.5}}>
                    <Menu renderer={Popover} rendererProps={{ preferredPlacement: 'bottom' }}>
                      <MenuTrigger>
                        <Image
                          source={isEmpty(umFiles[0]?.contents) ? require('/assets/images/logo11.png') : { uri: umFiles[0].contents }}
                          style={{width: 120, height: 120}}
                        />
                      </MenuTrigger>
                      <MenuOptions style={{ padding: 20 }}>
                        <MenuOption 
                          onSelect={() => onAddImage('unload', 0)}>
                          <Text style={{ color: 'black' }}>추가</Text>
                        </MenuOption>
                        <Text>{' '}</Text>
                        <MenuOption 
                          onSelect={() => onDeleteImage('unload', 0)}>
                          <Text style={{ color: 'black' }}>삭제</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </View>
                </View>
                {
                  umFiles.length === 0 ?
                  null
                  :
                  <View
                    style={{
                      flex: 1,
                      width: '50%',
                      marginLeft: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={{width: 120, height: 120, borderWidth: 0.5}}>
                      <Menu renderer={Popover} rendererProps={{ preferredPlacement: 'bottom' }}>
                        <MenuTrigger>
                          <Image
                            source={isEmpty(umFiles[1]?.contents) ? require('/assets/images/logo11.png') : { uri: umFiles[1].contents }}
                            style={{width: 120, height: 120}}
                          />
                        </MenuTrigger>
                        <MenuOptions style={{ padding: 20 }}>
                          <MenuOption 
                            onSelect={() => onAddImage('unload', 1)}>
                            <Text style={{ color: 'black' }}>추가</Text>
                          </MenuOption>
                          <Text>{' '}</Text>
                          <MenuOption 
                            onSelect={() => onDeleteImage('unload', 1)}>
                            <Text style={{ color: 'black' }}>삭제</Text>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
                    </View>
                  </View>
                }
              </View>
              {
                umFiles.length < 2 ?
                null
                :
                <View
                  style={{
                    height: 120,
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={{width: 120, height: 120, borderWidth: 0.5}}>
                      <Menu renderer={Popover} rendererProps={{ preferredPlacement: 'bottom' }}>
                        <MenuTrigger>
                          <Image
                            source={isEmpty(umFiles[2]?.contents) ? require('/assets/images/logo11.png') : { uri: umFiles[2].contents }}
                            style={{width: 120, height: 120}}
                          />
                        </MenuTrigger>
                        <MenuOptions style={{ padding: 20 }}>
                          <MenuOption 
                            onSelect={() => onAddImage('unload', 2)}>
                            <Text style={{ color: 'black' }}>추가</Text>
                          </MenuOption>
                          <Text>{' '}</Text>
                          <MenuOption 
                            onSelect={() => onDeleteImage('unload', 2)}>
                            <Text style={{ color: 'black' }}>삭제</Text>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
                    </View>
                  </View>
                  {
                    umFiles.length < 3 ?
                    null
                    :
                    <View
                      style={{
                        flex: 1,
                        width: '50%',
                        marginLeft: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View style={{width: 120, height: 120, borderWidth: 0.5}}>
                        <Menu renderer={Popover} rendererProps={{ preferredPlacement: 'bottom' }}>
                          <MenuTrigger>
                            <Image
                              source={isEmpty(umFiles[3]?.contents) ? require('/assets/images/logo11.png') : { uri: umFiles[3].contents }}
                              style={{width: 120, height: 120}}
                            />
                          </MenuTrigger>
                          <MenuOptions style={{ padding: 20 }}>
                            <MenuOption 
                              onSelect={() => onAddImage('unload', 3)}>
                              <Text style={{ color: 'black' }}>추가</Text>
                            </MenuOption>
                            <Text>{' '}</Text>
                            <MenuOption 
                              onSelect={() => onDeleteImage('unload', 3)}>
                              <Text style={{ color: 'black' }}>삭제</Text>
                            </MenuOption>
                          </MenuOptions>
                        </Menu>
                      </View>
                    </View>
                  }
                </View>
              }
            </Card.Content>
          </Card>
        </View>
      </View>
      {/* 하차지 정보 끝 */}
      {/* 기타 정보 */}
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
        <View style={{flex: 1}}>
          <Card style={styles.detailcard}>
            <Card.Content>
              <Paragraph
                style={{
                  padding: 5,
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#43A047',
                }}>
                운송비용 : {formatFare(cargo?.transitFare)}원
              </Paragraph>
              <Divider />
              <Paragraph
                style={{
                  padding: 5,
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#43A047',
                }}>
                차량정보
              </Paragraph>
              <Divider />
              <Paragraph
                style={{
                  padding: 5,
                  fontSize: 15,
                  fontWeight: '500',
                }}>
                화주명 : {cargo?.cargoownerName}
              </Paragraph>
              <Divider />
              <Paragraph
                style={{
                  padding: 5,
                  fontSize: 15,
                  fontWeight: '500',
                }}>
                화주연락처 : {cargo?.receiverPhone}
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
      </View>
      {/* 버튼 영역 상하자정보 저장 시 저장버튼, 이력정보 조회시 당기 버튼 */}
      <Divider />
      <View>
        <View style={styles.menuView}>
          <View style={{flex: 1}}>
            <Pressable
              style={styles.bottomButtonZone}
              onPress={() =>
                Alert.alert('꿀짐', '입력한 정보로 운송정보를 저장합니다', [
                  { text: '저장', onPress: () => handleCargoDetailSave() },
                  { text: '취소', onPress: () => { return }, },
                ])
              }
            >
              <Text style={styles.ButtonText}>저장</Text>
            </Pressable>
          </View>
          <View style={{flex: 1}}>
            <Pressable
              style={styles.bottomButtonZone}
              onPress={() => navigation.navigate('Main')}>
              <Text style={styles.ButtonText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </View>
      {/* 버튼 영역 수학 했을 경우에만 Display */}
      {/* 하차지 정보 끝 */}
    </ScrollLoadingIndicatorView>
  )
}

export default CargoDetail;

const styles = StyleSheet.create({
  menuView: {
    flex: 1,
    flexDirection: 'row',
    // height: 100,
    marginTop: 10,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    // backgroundColor: '#B3E5FC',
  },

  detailview: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    backgroundColor: 'green',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // borderBottomLeftRadius: 10,
    // borderBottompRightRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 0,
    marginBottom: 5,
    height: 120,
  },

  detailcard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottompRightRadius: 10,
    marginTop: 0,
    marginRight: 5,
    marginLeft: 5,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },

  detailcardcontents: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottompRightRadius: 10,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 10,
    marginBottom: 0,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    // height: 220,
  },

  detailtext: {
    // color: '#536DFE',
    fontSize: 13,
    fontWeight: '500',
  },

  text: {
    // color: '#536DFE',
    fontSize: 13,
    fontWeight: '500',
  },

  title2: {
    fontSize: 20,
    color: '#43A047',
  },

  cardTitle: {
    color: '#303F9F',
    fontSize: 20,
  },

  ButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '300',
  },

  buttonZone: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD740',
    height: 40,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    borderRadius: 30,
  },

  bottomButtonZone: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD740',
    height: 40,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },

  preview: {
    marginHorizontal: 10,
    width: 120,
    height: 120,
    backgroundColor: '#D2D2D2',
    marginBottom: 10,
  },
  previewImage: {
    height: 120,
    // resizeMode: 'contain',
    resizeMode: 'cover',
    // resiseMode에 따라 cover는 이미지 꽉차게, center은 가운데
  },
  cargotext: {
    // color: '#536DFE',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
    color: 'black',
  },
  cargotitletext: {
    // color: '#536DFE',
    fontSize: 14,
    fontWeight: '500',
    color: '#43A047',
    marginLeft: 40,
  },
});
