import { Button, ButtonProps } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../utils/web3utils';

export const ConnectButton: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  const { activate } = useWeb3React();
  const handleConnectWallet = async () => {
    try {
      await activate(injected);
    } catch (e) {
      console.log('error => ', e);
    }
  };
  return (
    <Button {...props} onClick={handleConnectWallet}>
      {children}
    </Button>
  );
};
