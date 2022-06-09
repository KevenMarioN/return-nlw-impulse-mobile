import React, { useCallback, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';

import { feedbackTypes } from '../../utils/feedbackTypes';
import { styles } from './styles';
import { theme } from '../../theme';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Options } from '../Options';
import { Success } from '../Sucess';
import { Form } from '../Form';


export type FeebackType = keyof typeof feedbackTypes



function Widget() {
  const [feebackType, setFeebackType] = useState<FeebackType | null>(null);
  const [feebackSent, setFeebackSent] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpen = useCallback(() => {
    bottomSheetRef.current?.expand()
  }, [])
  const handleRestartFeedback = useCallback(() => {
    setFeebackType(null)
    setFeebackSent(false)
  }, []);

  const handleFeedbackSent = useCallback(() => {
    setFeebackSent(true)
  }, []);
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots size={32} color={theme.colors.text_on_brand_color} weight="bold" />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          feebackSent ?
            <Success />
            :
            <>
              {
                feebackType ?
                  <Form
                  feebackType={feebackType}
                  onFeedBackCanceled={handleRestartFeedback}
                  onFeedbackSend={handleFeedbackSent}/>  
                :
                <Options onFeedbackTypeChanged={setFeebackType}/>
              }
            </>
        }
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget)