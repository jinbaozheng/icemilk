/**
 * Created by cuppi on 2017/7/20.
 */


/**
 * 影院筛选模型
 * @module model
 */
interface CinemaFilterModel{
  filmId: string;
  feature: string;
  region: string;
  sort: string;
  limit: string;
}

export default CinemaFilterModel;
