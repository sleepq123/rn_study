import AsyncStorage from '@react-native-community/async-storage';
/**
 * 离线缓存类
 */
class DataSource {
  /**
   * 保存数据
   * @param {String} key
   * @param {Object} data
   * @param {Function} bc
   */
  saveData(key, data, bc) {
    if (!data || !key) {
      return;
    }
    let dataObj = {
      data,
      timestamp: new Date().getTime(),
    };
    AsyncStorage.setItem(key, JSON.stringify(dataObj), bc(dataObj));
  }

  /**
   * 获取本地缓存
   * @param {String} key
   */
  getLocalData(key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
            console.error(e);
          }
        } else {
          reject(error);
          console.error(error);
        }
      });
    });
  }

  /**
   * 根据缓存策略获取 数据
   * @param {String} key
   * @param {Promise} apiPromise
   * @param {String} expireTime 默认1小时
   */
  fetchData(key, apiPromise, expireTime = 36 * 1000) {
    let result;
    return new Promise(async (resolve, reject) => {
      try {
        // 判断是否存在缓存
        let localData = await this.getLocalData(key);
        if (localData) {
          let {data, timestamp} = localData;
          // 判断缓存是否过期 (expireTime + timestamp > 当前时间 ? 未过期 : 过期)
          if (expireTime + timestamp > new Date().getTime()) {
            result = data;
            resolve(localData);
          } else {
            result = await apiPromise;
            this.saveData(key, result, resolve);
          }
        } else {
          result = await apiPromise;
          this.saveData(key, result, resolve);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default DataSource;
