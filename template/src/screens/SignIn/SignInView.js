import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Layout from '../../layout/Layout';
import Button from '../../components/Button/Button';

const SignInView = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <Layout>
      <Button title={t('home')} onPress={() => navigation.navigate('Home')} />
    </Layout>
  );
};

export default SignInView;
