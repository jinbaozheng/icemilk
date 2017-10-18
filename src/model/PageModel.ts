/**
 * Created by cuppi on 2017/7/20.
 */

/**
 * 分页模型
 * @memberOf module:model
 */
interface PageModel{
  /**
   * number 页号索引 1
   */
  index: number;

  /**
   * number 每页尺寸 5
   */
  size: number;
}

export default PageModel;
