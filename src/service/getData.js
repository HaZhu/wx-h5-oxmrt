import {
    axiosfn
} from '../config/axios';
//编译环境使用真实数据
if (process.env.NODE_ENV == 'development') {
    //充值列表
    var charge = () => {
        return axiosfn('rank/charge')
    }
    var pay = (platForm,flower_num) => {
        return axiosfn('gzh/pay',{
            platForm,
            flower_num
        })
    }
} else {
    var charge = () => {
       return axiosfn('rank/charge')
    }
    var pay = (platForm,flower_num) => {
        return axiosfn('gzh/pay',{
            platForm,
            flower_num
        })
    }
}
export {
    charge,pay
}