/**
 * Created by cuppi on 2017/7/20.
 */

/**
 * 座位图参数模型
 * @memberOf module:model
 */
interface SeatParasModel{

  /**
   * string 影院Id wangpiao | spider
   */
  cinemaId: string;

  /**
   * string 场次Id wangpiao | spider | maizuo | danche | maoyan | meituan | dazhong | baidu
   */
  showId: string;

  /**
   * string 放映厅Id spider */
  hallId: string;
}

export default SeatParasModel;
