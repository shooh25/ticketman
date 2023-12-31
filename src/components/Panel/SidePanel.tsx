import { Button, Drawer, IconButton } from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'

type DrawerProps = {
  open: boolean
  title: string
  onClose: () => void
  onDelete?: () => Promise<void>
  placement?: 'left' | 'right'
  children: React.ReactNode
}

export const SidePanel: React.FC<DrawerProps> = ({
  open,
  onClose,
  onDelete,
  title,
  placement = 'right',
  children,
}) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor={placement}
      PaperProps={{
        sx: { width: '50vw' },
      }}>
      <div className="mx-auto w-full px-4 py-6">
        <div className="flex items-center justify-between pr-4">
          <div className="mx-4 mb-2 flex items-center gap-4 border-gray-500 text-gray-500">
            <IconButton
              sx={{
                width: 16,
                height: 16,
                border: '1px solid #757575',
                padding: 2.3,
                borderRadius: 2,
              }}
              onClick={onClose}>
              <KeyboardArrowLeftIcon />
            </IconButton>
            <h3 className="my-4 text-2xl font-bold text-gray-800">{title}</h3>
          </div>
          {onDelete && (
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            <Button variant="outlined" color="error" onClick={onDelete}>
              削除する
            </Button>
          )}
        </div>
        {children}
      </div>
    </Drawer>
  )
}
