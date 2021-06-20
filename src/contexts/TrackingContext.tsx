import React, {
  createContext, useCallback, useMemo, useState,
} from 'react';

import { DataTrack } from '../components/DataTrack/index';
import api from '../services/api';
import history from '../services/history';
import { DataProps } from '../types/DataProps';
import { TrackingContextData } from '../types/TrackingContextData';

interface TrackingProviderProps {
  children: React.ReactNode;
}

const TrackingContext = createContext({} as TrackingContextData);

function TrackingProvider({ children }: TrackingProviderProps): JSX.Element {
  const [dataTrack, setDataTrack] = useState<DataProps | null | string>(null);
  const [trackCode, setTrackCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getTrackingData = useCallback(async (code: string) => {
    setLoading(true);
    setDataTrack(null);
    history.push('/tracks');
    const { data } = await api.get(`v1?codigo=${String(code)}`);

    try {
      setDataTrack(
        data.map(({
          cidade, dataHora, descricao, uf,
        }: DataProps) => (
          <DataTrack
            cidade={cidade}
            dataHora={dataHora}
            descricao={descricao}
            uf={uf}
          />
        )),
      );
      console.log(data);
      setTrackCode(String(code).toUpperCase());
      setLoading(false);
      setError(false);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.debug(' Erro:', data.error, '\n', 'Message:', data.message);
      setDataTrack(data.message);
      history.push('/error');

      setTimeout(() => {
        history.push('/');
      }, 6000);
    }
  }, []);
  const memoizedValue = useMemo(
    () => ({
      trackCode,
      dataTrack,
      loading,
      getTrackingData,
      error,
    }),
    [trackCode, dataTrack, loading, error, getTrackingData],
  );

  return (
    <TrackingContext.Provider value={memoizedValue}>
      {children}
    </TrackingContext.Provider>
  );
}

export { TrackingContext, TrackingProvider };
