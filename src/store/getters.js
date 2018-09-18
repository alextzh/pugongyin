
const getters = {
  isLogin: state => state.user.isLogin,
  userId: state => state.user.userId,
  mobile: state => state.user.mobile,
  password: state => state.user.password,
  chooseType: state => state.user.chooseType,
  step: state => state.user.step,
  machineNum: state => state.user.machineNum,
  errorMsg: state => state.user.errorMsg,
  modifyState: state => state.user.modifyState,
  routerQuery: state => state.user.routerQuery,
  adList: state => state.home.adList,
  activeIndex: state => state.home.activeIndex,
  currentAd: state => state.home.currentAd,
  flag: state => state.home.flag,
  allAsset: state => state.home.allAsset,
  dayAsset: state => state.home.dayAsset,
  messageList: state => state.home.messageList,
  messageNum: state => state.home.messageNum,
  messageState: state => state.home.messageState,
  pageFlag: state => state.home.pageFlag,
  winResult: state => state.home.winResult,
  stop: state => state.home.stop,
  timer: state => state.home.timer,
  subLoading: state => state.home.subLoading,
  profitRecord: state => state.mine.profitRecord,
  gender: state => state.mine.gender,
  nickname: state => state.mine.nickname,
  avatar: state => state.mine.avatar,
  loading: state => state.mine.loading,
  tradeRecord: state => state.mine.tradeRecord,
  productList: state => state.shop.productList,
  currentProduct: state => state.shop.currentProduct
}

export default getters
