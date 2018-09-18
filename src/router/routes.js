const Home = () => import('components/Home/Home')
const Community = () => import('components/Community/Community')
const Mining = () => import('components/Mining/Mining')
const Shop = () => import('components/Shop/Shop')
const Mine = () => import('components/Mine/Mine')
const Login = () => import('components/Login/Login')
const ScanLogin = () => import('components/Login/ScanLogin')
const MobileLogin = () => import('components/Login/MobileLogin')
const SetMobile = () => import('components/Register/SetMobile')
const Register = () => import('components/Register/Register')
const SetPassword = () => import('components/Register/SetPassword')
const ResetPassword = () => import('components/Register/ResetPassword')
const SetGesture = () => import('components/SetGesture/SetGesture')
const Message = () => import('components/Message/Message')
const AdDetail = () => import('components/Ad/AdDetail')
const AssetDetail = () => import('components/Asset/AssetDetail')
const Recharge = () => import('components/Recharge/Recharge')
const Withdraw = () => import('components/Withdraw/Withdraw')
const ProductDetail = () => import('components/Shop/ProductDetail')
const EditInformation = () => import('components/Mine/EditInformation')
const EditNickname = () => import('components/Mine/EditNickname')
const TradeRecord = () => import('components/TradeRecord/TradeRecord')
const ShouzhiRecord = () => import('components/ShouzhiRecord/ShouzhiRecord')
const Winning = () => import('components/Winning/Winning')
const WinningRecord = () => import('components/WinningRecord/WinningRecord')
const MyOrder = () => import('components/MyOrder/MyOrder')
const PurseAddress = () => import('components/PurseAddress/PurseAddress')
const Layout = () => import('components/Layout/Layout')
const Setting = () => import('components/Setting/Setting')
const VertifyCode = () => import('components/VertifyCode/VertifyCode')
const PerfectInfo = () => import('components/PerfectInfo/PerfectInfo')
const Expired = () => import('components/Expired/Expired')
const Success = () => import('components/Success/Success')
const AuthLogin = () => import('components/AuthLogin/AuthLogin')
const Error = () => import('components/Error/Error')

export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      }
    ]
  },
  {
    path: '/community',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Community',
        component: Community
      }
    ]
  },
  {
    path: '/mining',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Mining',
        meta: {
          requireAuth: true
        },
        component: Mining
      }
    ]
  },
  {
    path: '/shop',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Shop',
        component: Shop
      }
    ]
  },
  {
    path: '/mine',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Mine',
        meta: {
          requireAuth: true
        },
        component: Mine
      }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/scanLogin',
    name: 'ScanLogin',
    component: ScanLogin
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/mobileLogin',
    name: 'MobileLogin',
    component: MobileLogin
  },
  {
    path: '/setMobile',
    name: 'SetMobile',
    component: SetMobile
  },
  {
    path: '/setPassword',
    name: 'SetPassword',
    component: SetPassword
  },
  {
    path: '/resetPassword',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/setGesture',
    name: 'SetGesture',
    component: SetGesture
  },
  {
    path: '/message',
    name: 'Message',
    meta: {
      requireAuth: true
    },
    component: Message
  },
  {
    path: '/recharge',
    name: 'Recharge',
    meta: {
      requireAuth: true
    },
    component: Recharge
  },
  {
    path: '/withdraw',
    name: 'Withdraw',
    meta: {
      requireAuth: true
    },
    component: Withdraw
  },
  {
    path: '/ad/:id',
    props: true,
    name: 'AdDetail',
    meta: {
      requireAuth: true
    },
    component: AdDetail
  },
  {
    path: '/productDetail/:id',
    props: true,
    name: 'ProductDetail',
    meta: {
      requireAuth: true
    },
    component: ProductDetail
  },
  {
    path: '/assetDetail',
    name: 'AssetDetail',
    meta: {
      requireAuth: true
    },
    component: AssetDetail
  },
  {
    path: '/editInformation',
    name: 'EditInformation',
    meta: {
      requireAuth: true
    },
    component: EditInformation
  },
  {
    path: '/editNickname',
    name: 'EditNickname',
    meta: {
      requireAuth: true
    },
    component: EditNickname
  },
  {
    path: '/tradeRecord',
    name: 'TradeRecord',
    meta: {
      requireAuth: true
    },
    component: TradeRecord
  },
  {
    path: '/shouzhiRecord',
    name: 'ShouzhiRecord',
    meta: {
      requireAuth: true
    },
    component: ShouzhiRecord
  },
  {
    path: '/winning',
    name: 'Winning',
    meta: {
      requireAuth: true
    },
    component: Winning
  },
  {
    path: '/winningRecord',
    name: 'WinningRecord',
    meta: {
      requireAuth: true
    },
    component: WinningRecord
  },
  {
    path: '/myOrder',
    name: 'MyOrder',
    meta: {
      requireAuth: true
    },
    component: MyOrder
  },
  {
    path: '/purseAddress',
    name: 'PurseAddress',
    meta: {
      requireAuth: true
    },
    component: PurseAddress
  },
  {
    path: '/setting',
    name: 'Setting',
    meta: {
      requireAuth: true
    },
    component: Setting
  },
  {
    path: '/vertifyCode',
    name: 'VertifyCode',
    component: VertifyCode
  },
  {
    path: '/perfectInfo',
    name: 'PerfectInfo',
    component: PerfectInfo
  },
  {
    path: '/expired',
    name: 'Expired',
    component: Expired
  },
  {
    path: '/success',
    name: 'SuccessTip',
    component: Success
  },
  {
    path: '/error',
    name: 'Error',
    component: Error
  },
  {
    path: '/authLogin',
    name: 'AuthLogin',
    component: AuthLogin
  },
  {
    path: '*',
    redirect: '/error'
  }
]
