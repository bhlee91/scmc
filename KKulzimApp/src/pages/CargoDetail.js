import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {Card, Title, Divider, Paragraph, Chip} from 'react-native-paper';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer'; //사이즈가 커 리사이징 필요
import Icon from 'react-native-vector-icons/MaterialIcons';

import { isEmpty, formatFare } from "utils/CommonUtil";
import { formatDateTimeToKorea } from "utils/DateUtil";
import {
  getCargoRequestDetail
} from "api/cargo/index";

function CargoDetail({ navigation, route }) {
  const { Popover } = renderers

  const [cargo, setCargo] = useState({
    images: []
  })
  const [loadImages, setLoadImages] = useState([])
  const [unloadImages, setUnloadImages] = useState([])
  const [cargoThumbnail, setCargoThumbnail] = useState("")
  const [image, setImage] = useState({
    uri: '',
    name: '',
    type: '',
  })
  const [preview, setPreview] = useState()
  const [fileImage, setFileImage] = React.useState([])
  const [previewFile, setPreviewFile] = React.useState([])

  useEffect(() => {
    getCargoRequestDetail(route.params.reqId)
    .then(res => {
      if (res.data !== null) {
        if (res.data.cargoImages.length > 0) {
          setCargoThumbnail(res.data.cargoImages[0])
        }

        if (res.data.loadImages.length > 0) {
          setLoadImages(res.data.loadImages)
        }

        if (res.data.unloadImages.length > 0) {
          setUnloadImages(res.data.unloadImages)
        }

        delete res.data.images
        setCargo(res.data)
      }
    })
  }, [route.params?.reqId])

  const onResponse = useCallback(async (response, d, i) => {
    // console.log(
    //   '카메라 : ' + '카메라 w' + response.width,
    //   '카메라 높이 : ' + response.height,
    //   +'방향 : ' + response.exif,
    // );
    console.log('onResponse')
    console.log(d, i)
    console.log(response)
    setPreview({uri: `data:${response.mime};base64,${response.data}`})
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
      // 리사이징 이미지

      setImage({
        uri: r.uri,
        name: r.name,
        type: response.mime,
      })
    })
    .catch(err => {
      console.log('리사이즈 에러 + ' + err)
      ImagePicker.clean()
    })
  }, [])

  const onTakePhoto = useCallback(async (d, i) => {
    console.log('onTakePhoto')
    console.log(d, i)
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

  const onDeleteImage = (d, i) => {
    console.log(d, i)
  }

  const handleImageList = (d, i) => {
    switch(d) {
      case 'load':
        break;
      case 'unload':
        break;
    }
  }

  return (
    <ScrollView style={styles.mainView}>
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
              <Title style={styles.title2}>상차지</Title>
              <Paragraph>
                {formatDateTimeToKorea(cargo?.departDatetimes)}
              </Paragraph>
              <Paragraph>
                {cargo?.departAddrSt} {isEmpty(cargo?.departAddrSt2) ? "" : `(${cargo?.departAddrSt2})`}
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
                  <View style={{ width: 120, height: 120, borderWidth: 0.5 }}>
                    <Menu renderer={Popover} rendererProps={{ preferredPlacement: 'bottom' }}>
                      <MenuTrigger>
                        <Image
                          source={isEmpty(loadImages[0]?.contents) ? require('/assets/images/logo11.png') : { uri: loadImages[0].contents }}
                          style={{width: 120, height: 120}}
                        />
                      </MenuTrigger>
                      <MenuOptions style={{ padding: 20 }}>
                        <MenuOption 
                          disabled={!isEmpty(loadImages[0]?.contents)}
                          onSelect={() => onAddImage('load', 0)}>
                          <Text style={{ color: 'black' }}>추가</Text>
                        </MenuOption>
                        <Text>{' '}</Text>
                        <MenuOption 
                          disabled={isEmpty(loadImages[0]?.contents)}
                          onSelect={() => onDeleteImage('load', 0)}>
                          <Text style={{ color: 'black' }}>삭제</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </View>
                </View>
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
                          source={isEmpty(loadImages[1]?.contents) ? require('/assets/images/logo11.png') : { uri: loadImages[1].contents }}
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
              </View>
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
                          source={isEmpty(loadImages[2]?.contents) ? require('/assets/images/logo11.png') : { uri: loadImages[2].contents }}
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
                          source={isEmpty(loadImages[3]?.contents) ? require('/assets/images/logo11.png') : { uri: loadImages[3].contents }}
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
              <Title style={styles.title2}>하차지</Title>
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
                          source={isEmpty(unloadImages[0]?.contents) ? require('/assets/images/logo11.png') : { uri: unloadImages[0].contents }}
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
                          source={isEmpty(unloadImages[1]?.contents) ? require('/assets/images/logo11.png') : { uri: unloadImages[1].contents }}
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
              </View>
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
                          source={isEmpty(unloadImages[2]?.contents) ? require('/assets/images/logo11.png') : { uri: unloadImages[2].contents }}
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
                          source={isEmpty(unloadImages[3]?.contents) ? require('/assets/images/logo11.png') : { uri: unloadImages[3].contents }}
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
              </View>
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
              onPress={() => navigation.goBack()}>
              <Text style={styles.ButtonText}>닫기</Text>
            </Pressable>
          </View>
          {/* <View style={{flex: 1}}>
            <Pressable
              style={styles.buttonZone}
              onPress={() => Alert.alert('저장하기 로직')}>
              <Text style={styles.ButtonText}>저장</Text>
            </Pressable>
          </View> */}
        </View>
      </View>
      {/* 버튼 영역 수학 했을 경우에만 Display */}
      {/* 하차지 정보 끝 */}
    </ScrollView>
  );
}

export default CargoDetail;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#EEEEEE',
  },

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
