import {createSlice} from '@reduxjs/toolkit'
const initialUiState = {show: 'WelcomePage', sideBar: true, isLight: false}

const uiSlice = createSlice({
  name:'ui',
  initialState: initialUiState,
  reducers: {
    changeUi(state, action){
      state.show = action.payload
    },
    sideBar(state){
      state.sideBar = !state.sideBar
    },
    lightNight(state){
      state.isLight = !state.isLight
    }
  }
})

export default uiSlice
