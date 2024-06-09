import { DrawerWrapper } from "./Styled";

interface DrawerProps {
  left?: number;
  width?: number;
  order?: number;
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactElement;
}

export default function Drawer({
  onClose,
  children,
  left = 0,
  order = 0,
  width = 0,
  open = true,
}: DrawerProps) {
  return (
    <>
      <DrawerWrapper
        PaperProps={{
          elevation: 8,
        }}
        open={open}
        left={left}
        width={width}
        order={order}
        onClose={onClose}
        variant="permanent"
        sx={{ display: { xs: "block", sm: "block" } }}
      >
        {children}
      </DrawerWrapper>
    </>
  );
}
