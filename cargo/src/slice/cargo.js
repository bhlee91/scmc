import { createSlice } from "@reduxjs/toolkit"
import store from "src/store"

const initialState = {
  step: 0,
  imageList: [],
  cargoName: '',
  truckUid: null,
  cweight: 0,
  cheight: 0,
  cwidth: 0,
  cverticalreal: 0,
  departDatetimes: '',
  arrivalDatetimes: '',
  departAddrSt: '',
  departAddrOld: '',
  arrivalAddrSt: '',
  arrivalAddrOld: ''
}

const cargoSlice = createSlice({
  name: 'cargo',
  initialState,
  reducers: {
    SET_IMAGE(state) {
      state.step = 0
      state.imageList = store.getState().cargoImage
    },
    SET_REQUEST_1(state, action) {
      state.step = 1
      state.cargoName = action.payload.cargoName
      state.truckUid = action.payload.truckUid
    },
    SET_REQUEST_2(state, action) {
      state.step = 2
      state.cweight = action.payload.cweight
      state.cheight = action.payload.cheight
      state.cwidth = action.payload.cwidth
      state.cverticalreal = action.payload.cverticalreal
    },
    SET_REQUEST_3(state, action) {
      state.step = 3
      state.departDatetimes = action.payload.departDatetimes
      state.arrivalDatetimes = action.payload.arrivalDatetimes
    },
    SET_REQUEST_4(state, action) {
      state.step = 4
      state.departAddrSt = action.payload.departAddrSt
      state.departAddrOld = action.payload.departAddrOld
      state.arrivalAddrSt = action.payload.arrivalAddrSt
      state.arrivalAddrOld = action.payload.arrivalAddrOld
    }
  }
})

export default cargoSlice;