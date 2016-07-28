/**
 *  Class: PublishAD
 *  Author: lvpeipei
 *  Date: 16/7/12.
 *  Description: 旅游产品发布
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserInfo} from '../../actions/common';
import {setScroll} from '../../actions/pageScroll';
import {changePlace} from '../../actions/adpublish/place';
import {changeDate} from '../../actions/adpublish/calendar';
import {generateAD, recordValues, getADList} from '../../actions/adpublish/home';
import {Header} from '../../component/common/index';
import '../../css/PublishAD.less';
import FileUpload from 'react-fileupload';
import {FILE_UPLOAD_CONFIG} from '../../config/fileUpload';
import WeUI from 'react-weui';
import 'weui';
const {Toast} = WeUI;
const PAGE_ID = 'PublishAD';
/*
 * 组件入口文件
 */
let leftTo = null;
let leftIcon = 'fanhui';

class PublishAD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toastTimer: null
    };
    this.sendData = this.sendData.bind(this);
    this.fileChange = this.fileChange.bind(this);
    this.updateStoreInputValue = this.updateStoreInputValue.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    //初始化图片上传组件
    this.initFileUpload();
    //获取用户信息
    this.getUserInfo();
  }
  componentDidMount() {

    this.setScrollTop();
  }

  shouldComponentUpdate(nextProps, nextState) {
    //判断新的状态是否与现有状态一致,如果一致,则返回false,阻止更新
    //该函数默认返回true
    //return nextProps.state != this.props.state;
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    const {submitStatus} = this.props.state;

    //如果提交状态为done,初始化各输入项,返回到上一级路由
    if (submitStatus === 'done') {
      this.state.toastTimer = setTimeout(() => {
        this.initInput();
        this.context.router.goBack();
        this.props.actions.getADList('ADList');
      }, 2000);
    }
    if (submitStatus === 'failure') {
      alert('提交失败,请稍后再尝试!');
    }
  }

  componentWillUnmount() {
    const {actions} = this.props;
    actions.setScroll(PAGE_ID); //记录滚动条位置

    this.updateStoreInputValue();
    if (this.state.toastTimer) clearTimeout(this.state.toastTimer);
  }

  render() {
    const {
      name, //产品名称
      departure, //出发地
      destination, //目的地
      tagType, //产品类型
      price, //产品价格
      commissionPolicy,         //同业返利
      productPresent,      //产品简介
      startDate,  //有效期
      endDate,    //有效期
      uploadedFIle = '',     //产品图片
      productOffer,   //产品提供
      contact,        //联系人
      mobile, //电话
      submitStatus
      } = this.props.state;
    return (
      <div className="detail-bg">
        <Header leftTo={leftTo} leftIcon={leftIcon} title={'旅游产品发布'} />
        <div className="release-con">
          <input ref="name" className="input_style mar-top15" placeholder="产品名称" defaultValue={name} />
          <ul className="address mar-top15">
            <li className="border-bot" data-flex>
              <input
                ref="departure"
                data-flex-box="1"
                className="address-input"
                type="text"
                defaultValue={departure}
                placeholder="出发地/北京"
              />
              <Link to={`/SelectCity/start;${PAGE_ID}`}>
                <i data-flex-box="0"></i>
              </Link>
            </li>
            <li data-flex>
              <input
                ref="destination"
                data-flex-box="1"
                className="address-input"
                type="text"
                defaultValue={destination}
                placeholder="目的地/关键字"
              />
              <Link to={`/SelectCity/end;${PAGE_ID}`}>
                <i data-flex-box="0"></i>
              </Link>
            </li>
          </ul>
        </div>
        <ul className="product-box">
          <li data-flex>
            <div className="product-tit" data-flex-box="0"><div className="table-cell">产品类型</div></div>
            <div className="input-box" data-flex-box="1">
              <select ref="tagType" name="product-type" className="input_style" id="" defaultValue={tagType}>
                <option value="1">出境游</option>
                <option value="2">国内游</option>
                <option value="3">港澳台</option>
                <option value="4">套票</option>
                <option value="5">邮轮</option>
                <option value="6">本地游</option>
              </select>
            </div>
          </li>
          <li data-flex>
            <div className="product-tit" data-flex-box="0"><div className="table-cell">产品价格</div></div>
            <div className="input-box" data-flex-box="1"><input ref="price" className="input_style" type="text" defaultValue={price} /></div>
          </li>
          <li data-flex>
            <div className="product-tit" data-flex-box="0"><div className="table-cell">同业返利</div></div>
            <div className="input-box" data-flex-box="1"><textarea ref="commissionPolicy" className="text-fields" defaultValue={commissionPolicy}></textarea></div>
          </li>
          <li data-flex>
            <div className="product-tit" data-flex-box="0"><div className="table-cell">产品简介</div></div>
            <div className="input-box" data-flex-box="1"><textarea ref="productPresent" className="text-fields" defaultValue={productPresent}></textarea></div>
          </li>
          <li data-flex>
            <div className="product-tit"data-flex-box="0"><div className="table-cell">有效期</div></div>
            <div className="input-box" data-flex-box="1" data-flex="box:mean">
              <Link to={`/DateRangeSelector/start=${startDate};${PAGE_ID}`}>
                <div ref={s => { this.startDate = s; }} id="startDate" className="date-font border bor-radius">{startDate}</div>
              </Link>
              <Link to={`/DateRangeSelector/end=${endDate};${PAGE_ID}`}>
                <div ref={e => { this.endDate = e; }} className="date-font mar-lf10 border bor-radius">{endDate}</div>
              </Link>
            </div>
          </li>
        </ul>
        <ul className="product-box">
          <li data-flex>
            <div className="product-tit" data-flex-box="0"><div className="table-cell">上传图片</div></div>
            <div className="input-box" data-flex-box="1">
              <div className="upload-box">
                <img className="upload-img" ref="chooseBtn" style={{display: uploadedFIle ? 'block' : 'none'}} id="upload-img" src={uploadedFIle} alt="" />
                <FileUpload options={this.fileUploadConfig} >
                  <button className="upload-file" ref="chooseAndUpload">choose</button>
                </FileUpload>
                <div className="add-pic"></div>
              </div>
            </div>
          </li>
        </ul>
        <ul className="product-box">
          <li data-flex>
            <div className="product-tit" data-flex-box="0"><div className="table-cell">产品提供</div></div>
            <div className="input-box" data-flex-box="1">
              <input ref="productOffer" name="productOffer" className="input_style" type="text" value={productOffer} onChange={this.handleInputChange} />
            </div>
          </li>
          <li data-flex>
            <div className="product-tit" data-flex-box="0"><div className="table-cell">联系人</div></div>
            <div className="input-box" data-flex-box="1">
              <input ref="contact" name="contact" className="input_style" type="text" value={contact} onChange={this.handleInputChange} />
            </div>
          </li>
          <li data-flex>
            <div className="product-tit" data-flex-box="0"><div className="table-cell">联系电话</div></div>
            <div className="input-box" data-flex-box="1">
              <input ref="mobile" name="mobile" className="input_style" type="text" value={mobile} onChange={this.handleInputChange} />
            </div>
          </li>
        </ul>
        <div className="foot">
          <div className="but bor-radius" onClick={this.sendData}>提交</div>
        </div>
        <Toast icon="loading" show={submitStatus === 'doing'}>正在提交...</Toast>
        <Toast show={submitStatus === 'done'}>完成</Toast>
      </div>
    );
  }

  setScrollTop() {
    const {state: {scrollX, scrollY} } = this.props;
    window.scrollTo(scrollX, scrollY);
  }

  getUserInfo() {
    const {actions, state: {productOffer, contact} } = this.props;
    if (!productOffer && !contact) {
      actions.getUserInfo(PAGE_ID);
    }
  }

  initFileUpload() {
    const me = this;
    me.fileUploadConfig = Object.assign({}, FILE_UPLOAD_CONFIG, {
      chooseAndUpload: true,
      chooseFile(files) {
        let uploadImg = document.getElementById('upload-img');
        //console.log(uploadImg);
        let reader = new FileReader();
        let file = files[0];
        uploadImg.style.display = 'block';
        //console.log(reader);
        reader.onload = (event) => {
          uploadImg.setAttribute('src', event.target.result);
        };
        reader.readAsDataURL(file);
      },
      uploadSuccess(resp) {
        /*通过mill找到对应的文件，删除对应tmpFile*/
        //popTmpSave(resp.mill);
        console.log('upload success', resp.data);
        me.uploadedFIlePath = resp.data;
      }
    });
  }

  fileChange(e) {
    let uploadImg = document.getElementById('upload-img');
    let files = e.target.files;
    let reader = new FileReader();
    let file = files[0];
    uploadImg.style.display = 'block';
    reader.onload = (event) => {
      uploadImg.setAttribute('src', event.target.result);
    };
    reader.readAsDataURL(file);
  }

  sendData() {
    const adInfo = this.getInputtedValue('commit');
    //验证是否存在未填项目
    for (let obj in adInfo) {
      if (adInfo[obj] == '' && this.refs[obj]) {
        this.refs[obj].focus();
        return;
      }
    }
    let sendData = Object.assign(adInfo, {id: this.props.state.id, pics: this.props.state.pics});
    if (this.uploadedFIlePath) {
      if (sendData.pics.length > 0) {
        sendData.pics[0].picturePath = this.uploadedFIlePath;
      } else {
        sendData.pics.push({picturePath: this.uploadedFIlePath});
      }
    }
    //执行action提交广告产品
    this.props.actions.generateAD(sendData, PAGE_ID);
  }

  initInput() {
    //将所有类型为"input"或"Textarea"的项目设置为空
    for (let ref in this.refs) {
      const el = this.refs[ref];
      if (['INPUT', 'TEXTAREA'].includes(el.nodeName)) {
        el.value = '';
      }
    }
    this.startDate.innerText = new Date().Format('yyyy-MM-dd');
    this.endDate.innerText = new Date().Format('yyyy-MM-dd');
    document.getElementById('upload-img').setAttribute('src', '');
    this.props.actions.recordValues(this.getInputtedValue(), PAGE_ID);
  }

  updateStoreInputValue() {
    const {actions} = this.props;
    let listData = this.getInputtedValue();
    actions.recordValues(listData, PAGE_ID);
  }

  getInputtedValue(type) {
    let uploadImg = document.getElementById('upload-img');
    let ImgSrc = uploadImg.getAttribute('src');
    return {
      name: this.refs.name.value, //产品名称
      departure: this.refs.departure.value, //出发地
      destination: this.refs.destination.value, //目的地
      tagType: this.refs.tagType.value, //产品类型
      price: this.refs.price.value, //产品价格
      commissionPolicy: this.refs.commissionPolicy.value,         //同业返利
      productPresent: this.refs.productPresent.value,      //产品简介
      startDate: this.startDate.innerText,  //有效期
      endDate: this.endDate.innerText,    //有效期
      productOffer: this.refs.productOffer.value,   //产品提供
      contact: this.refs.contact.value,        //联系人
      mobile: this.refs.mobile.value,   //电话
      submitStatus: 'ready',   //提交状态
      uploadedFIle: type === 'commit' ? '' : ImgSrc
    };
  }

  handleInputChange(e) {
    const {actions, state} = this.props;
    const stateKey = e.target.name;
    const stateValue = e.target.value;
    const nextState = state;
    nextState[stateKey] = stateValue;
    actions.recordValues(nextState, PAGE_ID);
  }
}

PublishAD.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(state =>
    ({state: state.publishAD}),
  (dispatch) => ({
    actions: bindActionCreators({
      setScroll,
      changePlace,
      changeDate,
      generateAD,
      recordValues,
      getUserInfo,
      getADList}, dispatch)
  })
)(PublishAD);