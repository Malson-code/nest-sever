/** mongodb 地址 */
export const mongodbURL = 'mongodb://localhost/malson-test';

/** jwt 秘钥 */
export const jwtSecret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

/** jwt 秘钥过期时间 */
export const jwtSecretexpiresIn = 3600; //秒

/** 请求白名单 */
export const reqWhiteURLs = ['/login'];

/** mongo 通用配置 */
export const schemaOptions = {
  versionKey: false, // 取消Mongo自动生成version
  timestamps: true, // 自动生成创建时间和更新时间
  toObject: {
    getters: true,
    virtuals: false,
  },
};
