import axios from 'axios'
import request from '@/axios/request'
/**
	通用埋点
	@param {Object} {
        module：string 模式
        event：string 事件
        business_parent_id：string  具体业务具体分析
        business_id：string 具体业务具体分析
        business_child_id：string 具体业务具体分析
    }
	@return
 */
interface bury {
    module?: string,
    event?: string,
    business_parent_id?: string,
    business_id?: string,
    business_child_id?: string
}
const curBury = ({module,event,business_parent_id,business_id,business_child_id}:bury) => {
    axios.post(`${request.live}/v1/click`, {
        module: module,
        event: event,
        business_parent_id: business_parent_id,
        business_id: business_id,
        business_child_id: business_child_id
    }).then((res: any) => {})
}


export {
    curBury
}