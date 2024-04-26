import storeActionType from './actionTypes';

const initialState = {
  selectedCategory: null,
  selectedSubcategory: null,
  isShowCategoryMenu: false,
  isShowMobileMenu: false,
  searchValue: '',
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case storeActionType.SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.payload };

    case storeActionType.SET_SELECTED_SUBCATEGORY:
      return { ...state, selectedSubcategory: action.payload };

    case storeActionType.TOGGLE_CATEGORY_MENU:
      return { ...state, isShowCategoryMenu: !state.isShowCategoryMenu };

    case storeActionType.CLOSE_CATEGORY_MENU:
      return { ...state, isShowCategoryMenu: false };

    case storeActionType.TOGGLE_MOBILE_MENU:
      return { ...state, isShowMobileMenu: !state.isShowMobileMenu };

    case storeActionType.CLOSE_MOBILE_MENU:
      return { ...state, isShowMobileMenu: false };

    case storeActionType.SEARCH_PRODUCT:
      return { ...state, searchValue: action.payload };

    default:
      return state;
  }
};

export default appReducer;
