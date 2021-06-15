import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderContainer = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

export const Inner = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;

  animation: ${rotate} 600ms linear infinite;

  border-bottom: 3px solid ${({ theme }) => theme.colors.inputBackground};
`;
