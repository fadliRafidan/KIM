import axios from 'axios';
import {Button, Modal, useToast} from 'native-base';
import React, {Fragment, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SimpleSurvey} from 'react-native-simple-survey';
import {useSelector} from 'react-redux';
import URL from '../../../global.json';
import {COLORS} from '../../components/Colors';
import CustomHeaderBG from '../../components/CustomHeaderBG';
import Loading from '../../components/Loading';



const survey = [
  {
    questionType: 'SelectionGroup',
    questionText:
      'Indonesia memiliki keberagaman yang tinggi lebih dari bangsa-bangsa lain, dari sudut suku, budaya, agama, ras, dan lain sebagainya',
    questionId: 'pertanyaan 1',
    questionSettings: {
      allowDeselect: false,
    },
    options: [
      {
        optionText: 'Sangat Setuju',
        value: '4',
      },
      {
        optionText: 'Setuju',
        value: '3',
      },
      {
        optionText: 'Kurang Setuju',
        value: '2',
      },
      {
        optionText: 'Tidak Setuju',
        value: '1',
      },
    ],
  },
];


export default function IsiSurvey({navigation, route}) {
  let user = useSelector(state => state.AuthReducers.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [counter, setCounter] = useState(1);
  const [loading, setLoading] = useState(false);
  const {surveyDetail, id} = route.params;


  const increase = () => {
    setCounter(count => count + 1);
  };

  //decrease counter
  const decrease = () => {
    setCounter(count => count - 1);
  };

  console.log(counter);

  const toast = useToast();

  function onSurveyFinished(answers) {
    const infoQuestionsRemoved = [...answers];

    const answersAsObj = {};
    for (const elem of infoQuestionsRemoved) {
      answersAsObj[elem.questionId] = elem.value;
    }

    const answersAsObj2 = {};
    for (const elem of infoQuestionsRemoved) {
      answersAsObj2["ref_kuesioner_id"] = elem.questionId;
    }
    const answersAsObj3 = {};
    for (const elem of infoQuestionsRemoved) {
      answersAsObj3["jawaban"] = elem.value.value;
    }

    let data = [
      {
        ref_kuesioner_id : answersAsObj2.ref_kuesioner_id,
        kategori_survey_id : id,
        jawaban : answersAsObj3.jawaban,
        user_id : user.id
      }
    ] 

    const MyObj = {data:data}
    


    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    axios
        .post(URL.baseURL + 'jawaban-survey',MyObj, config)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            console.log('post success ', res.status);
            navigation.navigate('SurveyBerhasil');
            setLoading(false);
            toast.show({
              render: () => {
                return (
                  <View
                    style={{
                      backgroundColor: '#34ebde',
                      padding: 15,
                      borderRadius: 15,
                      marginTop: 50,
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#fff',
                        fontWeight: '500',
                        marginRight: 4,
                      }}>
                      Media berhasil dibuat
                    </Text>
                    <Icon name="thumbs-up" size={20} />
                  </View>
                );
              },
              placement: 'top',
            });
          
          }
        })
        .catch(err => {
          console.log(err);
          toast.show({
            render: () => {
              return (
                <View
                  style={{
                    backgroundColor: '#b51105',
                    padding: 15,
                    borderRadius: 15,
                    marginTop: 50,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#fff',
                      fontWeight: '500',
                      marginRight: 4,
                    }}>
                    {err}
                  </Text>
                  <Icon name="window-close" size={20} />
                </View>
              );
            },
            placement: 'top',
          });
        });
  
    
    // setModalVisible(!modalVisible);
  }

  const _KirimSurvey = async () => {
    let formdata = new FormData();
    formdata.append('user_id', user.id);
    formdata.append('ref_kuesioner_id', '1');
    formdata.append('kategori_survey_id', '2');
    formdata.append('jawaban', '2');

    axios
      .post(URL.baseURL + 'tambah-kegiatan', formdata, config)
      .then(res => {
        if (res.status === 200) {
          console.log('post success ', res.status);
          setLoading(false);
          toast.show({
            render: () => {
              return (
                <View
                  style={{
                    backgroundColor: '#34ebde',
                    padding: 15,
                    borderRadius: 15,
                    marginTop: 50,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#fff',
                      fontWeight: '500',
                      marginRight: 4,
                    }}>
                    Terima Kasih telah mengisi survey
                  </Text>
                  <Icon name="thumbs-up" size={20} />
                </View>
              );
            },
            placement: 'top',
          });
          navigation.navigate('SurveyBerhasil', {
            surveyAnswers: answersAsObj,
          });
        }
      })
      .catch(err => {
        console.log(err);
        toast.show({
          render: () => {
            return (
              <View
                style={{
                  backgroundColor: '#b51105',
                  padding: 15,
                  borderRadius: 15,
                  marginTop: 50,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#fff',
                    fontWeight: '500',
                    marginRight: 4,
                  }}>
                  {err}
                </Text>
                <Icon name="window-close" size={20} />
              </View>
            );
          },
          placement: 'top',
        });
      });
  };

  function onAnswerSubmitted(answer) {
    switch (answer.questionId) {
      case 'favoriteColor': {
        if (COLORS.includes(answer.value.toLowerCase())) {
        }
        break;
      }
      default:
        break;
    }
  }

  function renderPreviousButton(onPress, enabled) {
    return (
      <View
        style={{flexGrow: 1, maxWidth: 130, marginTop: 80, marginBottom: 10}}>
        <TouchableOpacity
          onPress={() => {
            onPress(), decrease();
          }}
          disabled={!enabled}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderColor: '#E74C3C',
            borderWidth: 2,
            height: 45,
            borderRadius: 23,
          }}>
          <Text style={{color: '#E74C3C', fontSize: 18, fontWeight: '500'}}>
            Kembali
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderNextButton(onPress, enabled) {
    return (
      <View
        style={{flexGrow: 1, maxWidth: 130, marginTop: 80, marginBottom: 10}}>
        <TouchableOpacity
          onPress={() => {
            onPress(), increase();
          }}
          disabled={!enabled}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E74C3C',
            height: 45,
            borderRadius: 23,
          }}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
            Selanjutnya
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderFinishedButton(onPress, enabled) {
    return (
      <View
        style={{flexGrow: 1, maxWidth: 130, marginTop: 80, marginBottom: 10}}>
        <TouchableOpacity
          onPress={onPress}
          disabled={!enabled}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E74C3C',
            height: 45,
            borderRadius: 23,
          }}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
            Finished
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderButton(data, index, isSelected, onPress) {
    return (
      <View key={`selection_button_view_${index}`}>
        <TouchableOpacity
          key={`button_${index}`}
          onPress={onPress}
          style={{
            marginTop: 10,
            marginBottom: 5,
            justifyContent: 'flex-start',
            flexDirection: 'row',
            paddingHorizontal: 30,
            borderColor: 'red',
            borderWidth: 1,
            padding: 7,
            borderRadius: 15,
          }}>
          <View
            style={{
              height: 23,
              width: 23,
              borderRadius: 50,
              borderColor: 'grey',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1.5,
              marginRight: 10,
            }}>
            <View
              style={
                isSelected
                  ? {
                      height: 15,
                      width: 15,
                      borderRadius: 50,
                      backgroundColor: 'red',
                    }
                  : {
                      height: 15,
                      width: 15,
                      borderRadius: 50,
                      backgroundColor: 'white',
                    }
              }
            />
          </View>

          <Text
            onPress={onPress}
            style={
              isSelected
                ? {color: 'red', fontSize: 18, fontWeight: '500'}
                : {color: 'black', fontSize: 18, fontWeight: '500'}
            }>
            {data.optionText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderQuestionText(questionText) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFDADA',
          display: 'flex',
          borderRadius: 20,
          width: 340,
          paddingVertical: 20,
          marginBottom: 20,
        }}>
        <Text
          style={{
            marginTop: 10,
            fontSize: 18,
            fontWeight: '500',
            color: 'white',
            backgroundColor: 'red',
            textAlign: 'center',
            borderRadius: 9,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            padding: 8,
            position: 'absolute',
            top: -25,
            left: 10,
          }}>
          {counter}
        </Text>
        <View style={{paddingHorizontal: 20}}>
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: '500',
              color: 'black',
            }}>
            {questionText}
          </Text>
        </View>
      </View>
    );
  }

  function renderTextBox(onChange, value, placeholder, onBlur) {
    return (
      <View>
        <TextInput
          style={styles.textBox}
          onChangeText={text => onChange(text)}
          numberOfLines={1}
          underlineColorAndroid={'white'}
          placeholder={placeholder}
          placeholderTextColor={'rgba(184,184,184,1)'}
          value={value}
          multiline
          onBlur={onBlur}
          blurOnSubmit
          returnKeyType="done"
        />
      </View>
    );
  }

  function renderInfoText(infoText) {
    return (
      <View style={{marginLeft: 10, marginRight: 10}}>
        <Text style={styles.infoText}>{infoText}</Text>
      </View>
    );
  }

  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeaderBG
          label="Survey Masyarakat"
          onPress={() => navigation.goBack()}
        />
        {loading ? <Loading /> : null}
        <View
          style={{
            paddingHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SimpleSurvey
            ref={surveyRef => {
              surveyRef = surveyRef;
            }}
            survey={surveyDetail}
            renderSelector={renderButton}
            containerStyle={styles.surveyContainer}
            selectionGroupContainerStyle={styles.selectionGroupContainer}
            navButtonContainerStyle={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
            renderPrevious={renderPreviousButton}
            renderNext={renderNextButton}
            renderFinished={renderFinishedButton}
            renderQuestionText={renderQuestionText}
            onSurveyFinished={answers => onSurveyFinished(answers)}
            onAnswerSubmitted={answer => onAnswerSubmitted(answer)}
            renderTextInput={renderTextBox}
            renderInfo={renderInfoText}
          />
        </View>
        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          avoidKeyboard
          justifyContent="center"
          bottom="4"
          size="lg">
          <Modal.Content>
            <Modal.Header textAlign="center" alignItems="center">
              Kirim Survey ini?
            </Modal.Header>
            <Modal.Body>
              <Button
                flex="1"
                marginBottom="3"
                colorScheme="error"
                onPress={() => {
                  setModalVisible(false);
                }}>
                Batal
              </Button>
              <Button colorScheme="info" flex="1" onPress={_KirimSurvey}>
                Ya, Kirim!
              </Button>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: '70%',
    maxWidth: '90%',
    alignItems: 'stretch',
    justifyContent: 'center',

    elevation: 20,
    borderRadius: 10,
    flex: 1,
  },
  answersContainer: {
    width: '90%',
    maxHeight: '20%',
    marginTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 10,
  },
  surveyContainer: {
    width: 'auto',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignContent: 'center',
    padding: 5,
    flexGrow: 0,
  },
  selectionGroupContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignContent: 'flex-end',
  },
  background: {
    flex: 1,
    minHeight: 800,
    maxHeight: 800,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    marginBottom: 20,
    fontSize: 20,
  },
  textBox: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,

    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10,
  },
  numericInput: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10,
  },
  infoText: {
    marginBottom: 20,
    fontSize: 20,
    marginLeft: 10,
  },
});

