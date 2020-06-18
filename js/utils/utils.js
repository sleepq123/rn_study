import {Toast as ZToast} from '@ant-design/react-native';

export class Toast {
  static success(content) {
    ZToast.success(content, 1, undefined, false);
  }
  static info(content) {
    ZToast.info(content, 1, undefined, false);
  }
  static fail(content) {
    ZToast.fail(content, 1, undefined, false);
  }
}
