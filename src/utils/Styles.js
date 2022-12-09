import { Dimensions, StyleSheet } from 'react-native';
import configData from '../../config.json';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea"
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  btn: {
    width: '100%',
    padding: 12.5,
    backgroundColor: "#cdcdcd",
    borderRadius: 10,
    justifyContent:"center",
    alignItems:"center"
  },
  btnText: {
    textAlign: 'center',
    color: "#FFFFFF"
  },
  borderPrimary:{
    borderColor:"#6382E6"
  },
  btnPrimary: {
    backgroundColor: '#6382E6',
  },
  bgPrimary: {
    backgroundColor: '#6382E6',
  },
  bgPrimarySoft:{
    backgroundColor : '#F1F4FF'
  },
  bgPrimarySoftTransparent:{
    backgroundColor : '#F1F4FF50'
  },
  bgWhite: {
    backgroundColor: '#fff',
  },
  bgDefault: {
    backgroundColor: '#019ACF',
  },
  bgGray: {
    backgroundColor: '#C4C4C4',
  },
  btnRounded: {
    borderRadius: 60
  },
  textRegular: {
    fontFamily: "SegoeUI"
  },
  textLight: {
    fontFamily: "SegoeUI-Light"
  },
  textSemiBold: {
    fontFamily: "SegoeUI-SemiBold"
  },
  textBold: {
    fontFamily: "SegoeUI-Bold"
  },
  textBlack: {
    color: '#222222',
  },
  textPrimary: {
    color: '#1B1D55',
  },
  textDarkBlue:{
    color : '#020288'
  },
  textPrimary2: {
    color: '#6382E6'
  },
  textSecondary: {
    color: 'rgba(34, 34, 34, 0.5)',
  },
  textDefault: {
    color: '#019ACF'
  },
  textGray: {
    color: '#BEBEBE'
  },
  textGray2: {
    color: '#929292'
  },
  textWhite: {
    color: "white"
  },
  textDanger:{
    color : "#F68260"
  },
  textOrange: {
    color: "#FFAA00"
  },
  textSuccess:{
    color:"#28c76f"
  },
  bgSuccessSoft:{
    backgroundColor:"#e3f7ec"
  },
  bgDanger:{
    backgroundColor : "#F68260"
  },
  bgBlue: {
    backgroundColor: "#6382E6"
  },
  bgOrange: {
    backgroundColor: "#FFAA00"
  },
  bgLightBlue:{
    backgroundColor:"#4ED8EE"
  },
  bgSuccess:{
    backgroundColor:"#28c76f"
  },  
  bgSoftBlue:{
    backgroundColor:"#DBE3FF"
  },  
  bgSoftPink:{
    backgroundColor:"#FDE9F5"
  },  
  bgSoftOrange:{
    backgroundColor:"#fff5e5"
  },
  bgPink:{
    backgroundColor:"#FFAA00"
  },
  bgBrown:{
    backgroundColor:"#ECC500"
  },
  sliderPromosi: {
    width: (viewportWidth-50) * 75 / 100,
    height: 95,
    borderRadius: 15,
    alignItems: "center",
    padding: 15,
    flexDirection: "row",
    marginRight: 15
  },
  boxMenu: {
    shadowColor: "rgba(112,144,176,50)",
    borderRadius: 11,
    elevation:5,
    width  : 65,
    height : 65,
    backgroundColor: '#ffffff',
    justifyContent: "center",
    alignItems: "center"
  },
  boxMenu3: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 40,
    shadowColor: "rgba(112,144,176,50)",
    elevation:5,
    shadowRadius: 20,
    borderRadius: 11,
    backgroundColor: '#ffffff',
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center"
  },
  textBoxMenu3:{
    fontFamily:'SegoeUI',
    fontSize:12,
    color : '#222222'
  },
  boxImage: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 40,
    shadowColor: "rgba(0,0,0,16)",
    elevation : 5,
    shadowRadius: 6,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    width: (viewportWidth - 60) * 50 / 100,
    height: (viewportWidth - 60) * 45 / 100,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  boxImage2: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 40,
    shadowColor: "rgba(0,0,0,16)",
    elevation : 5,
    shadowRadius: 6,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  textTittle: {
    fontFamily: "SegoeUI-SemiBold",
    fontSize: 16,
  },
  textDesc: {
    fontSize: 14,
  },row:{
    flexDirection: 'row',
    marginLeft: -5, 
    marginRight: -5, 
  },
  col3:{
    width : '25%',
    paddingRight:5,
    paddingLeft:5
  },
  col6:{
    width : '50%',
    paddingRight:5,
    paddingLeft:5
  },
  col12:{
    width : '100%',
    paddingRight:5,
    paddingLeft:5
  },
  col8:{
    width : '67%',
    paddingRight:5,
    paddingLeft:5
  },
  col4:{
    width : '33.333%',
    paddingRight:5,
    paddingLeft:5
  },
  alert:{
    borderRadius:7,
    padding:10
  },
  textFieldframe:{
      borderWidth: 1,
      borderColor: configData.themeColors.gray,
      padding: 10,
      paddingVertical:5,
      borderRadius: 7.5
  },
  shadowPrimary:{
    elevation: 5, backgroundColor: 'white', shadowColor: 'rgba(112,144,176,50)'
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: '90%',
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },
});