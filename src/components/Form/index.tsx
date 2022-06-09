import React, { useCallback, useState } from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot'

import { theme } from '../../theme';
import { FeebackType } from '../Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { styles } from './styles';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';

interface Props {
  feebackType: FeebackType;
  onFeedBackCanceled: () => void;
  onFeedbackSend: () => void;
}
const isIOS = Platform.OS === 'ios';
const statusBarHeight = isIOS ? ifIphoneX(44, 20) : 0;
const navBarHeight = isIOS ? 44 : 56;
const headerHeight = statusBarHeight + navBarHeight;

export function Form({ feebackType,onFeedBackCanceled,onFeedbackSend }: Props) {
  const [ isSendingFeedback,setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const feedBackTypeInfo = feedbackTypes[feebackType];

  const handleScreenShot = useCallback(() => {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
      .then(uri => setScreenshot(uri))
      .catch(error => console.error(error))
  }, []);

  const handleScreenShotRemove = useCallback(() => {
    setScreenshot(null)
  }, []);

  const handleSendFeedback = useCallback(() => {
    if(isSendingFeedback){
      return;
    }

    setIsSendingFeedback(true)
  },[])
  return (
    <View style={styles.container}>
     <KeyboardAvoidingView
          keyboardVerticalOffset={headerHeight}
          behavior={Platform.OS === 'ios' ? 'position' : undefined}
        >
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedBackCanceled}>
          <ArrowLeft size={24} weight="bold" color={theme.colors.text_secondary} />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image
            style={styles.image}
            source={feedBackTypeInfo.image} />
          <Text style={styles.titleText}>
            {feedBackTypeInfo.title}
          </Text>
        </View>
      </View>
      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo!"
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
      />
      <View style={styles.footer}>
        <ScreenshotButton
          onRemoveShot={handleScreenShotRemove}
          onTakeShot={handleScreenShot}
          screenshot={screenshot}
        />
        <Button isLoading={isSendingFeedback} disabled={isSendingFeedback} onPress={handleSendFeedback}/>
      </View>
      </KeyboardAvoidingView>
    </View>
  );
}