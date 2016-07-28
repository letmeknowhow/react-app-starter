/**
 *  Class: fileUpload
 *  Author: Niu Xiaoyu
 *  Date: 16/7/19.
 *  Description:
 */

export const FILE_UPLOAD_CONFIG = {
  baseUrl: 'ajax/advertise/uploadPic.do',
  param: {
    name: '123',
    category: '1'
  },
  dataType: 'json',
  wrapperDisplay: 'inline-block',
  multiple: true,
  numberLimit: 9,
  accept: 'image/*',
  chooseAndUpload: false,
  paramAddToField: {purpose: 'save'},
  fileFieldName: 'file',
  //fileFieldName(file){ return file.name },
  beforeChoose() {
    //return user.isAllowUpload;
  },
  chooseFile(files) {
    //console.log('you choose', typeof files == 'string' ? files : files[0].name);
  },
  beforeUpload(files, mill) {
    console.log('beforeUpload');
    if (typeof files == 'string') return true;
    if (files[0].size < 1024 * 1024 * 20) {
      //files[0].mill = mill;
      return true;
    }
    return false;
  },
  doUpload(files, mill) {
    const isFile = !(typeof files == 'string');
    const name = isFile ? files[0].name : files;
    const tmpFile = {
      name,
      mill: isFile ? files[0].mill : mill
    };
    /*存入暂存空间*/
    //tempSave.push(tmpFile);
    console.log('uploading', name);
  },
  uploading(progress) {
    console.log('loading...', progress.loaded / progress.total + '%');
  },
  uploadSuccess(resp) {
    /*通过mill找到对应的文件，删除对应tmpFile*/
    //popTmpSave(resp.mill);
    console.log('upload success', resp.data);
  },
  uploadError(err) {
    console.error(err.message);
  },
  uploadFail(resp) {
    console.error(resp);
  },
};