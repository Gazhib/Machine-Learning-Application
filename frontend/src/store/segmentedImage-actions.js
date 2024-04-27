import {createSlice} from '@reduxjs/toolkit'
const initialArrayState = {originalImages: [], segmentedImages: []}

const imagesSlice = createSlice({
  name:'images',
  initialState: initialArrayState,
  reducers: {
    addingOriginalImage(state, action){
      state.originalImages.push(action.payload)
    },
    addingSegmentedImage(state, action){
      state.segmentedImages.push(action.payload)
    }
  }
})


export default imagesSlice