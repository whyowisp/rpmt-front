import { createSlice } from '@reduxjs/toolkit'
import campaignService from '../services/campaigns'

//ABOUT ACTION NAMING
//Regular action naming convention: name actions as event (broader terms than simply 'setters')
//House action naming rules: name as what is about to happen:
//For example: What is about to happen? - campaignInitialization is about to happen.

export const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState: null,
  reducers: {
    campaignsInitialization(state, action) {
      return action.payload
    },
    campaignCreation(state, action) {
      state.push(action.payload)
    },
    campaignEdition(state, action) {
      const id = action.payload.id
      const content = action.payload.content

      const campaignInEdit = state.find((campaign) => campaign._id === id)
      const editedCampaign = Object.assign(campaignInEdit, content)

      state.map((campaign) => (campaign._id !== id ? campaign : editedCampaign))
    },
    campaignRemoval(state, action) {
      const id = action.payload
      return state.filter((campaign) => campaign._id !== id)
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  campaignsInitialization,
  campaignEdition,
  campaignCreation,
  campaignRemoval,
} = campaignsSlice.actions

// *** START OF THUNK FUNCTIONS ***

export const initCampaigns = () => {
  return async (dispatch) => {
    const campaignsFromDb = await campaignService.getAll()
    dispatch(campaignsInitialization(campaignsFromDb))
  }
}

export const createNewCampaign = (playerId) => {
  return async (dispatch) => {
    const newCampaign = await campaignService.createNew(playerId)
    console.log('new Campaign (hello from reducer): ' + newCampaign)
    dispatch(campaignCreation(newCampaign))
  }
}
/*
Pass data to this function:
Use format:

{
  id: <campaignId>,
  content: {<theData>}
}
*/
export const editCampaign = (data) => {
  return async (dispatch) => {
    dispatch(campaignEdition(data))
    await campaignService.updateChar(data.content, data.id)
    //.then((result) =>console.log('result of update: ' + JSON.stringify(result)))
  }
}

export const deleteOne = (id) => {
  return async (dispatch) => {
    dispatch(campaignRemoval(id))
    await campaignService.deleteCampaign(id)
  }
}

// *** END OF THUNK FUNCTIONS ***

export default campaignsSlice.reducer
