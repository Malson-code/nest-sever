/*
 * @Author: malson
 * @Description:  公共工具方法
 */

/** 分页查询获取总条数及分页信息 */

export function getCountAndData(page, size, searchParams = []) {
  return {
    $facet: {
      total: [
        {
          $count: 'count', // 获取总条数
        },
      ],
      data: [
        {
          $skip: (page - 1) * size,
        },
        {
          $limit: size,
        },
        ...searchParams,
      ],
    },
  };
}
