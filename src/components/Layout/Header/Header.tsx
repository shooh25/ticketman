import React, { useCallback, useState } from 'react'
import { Navbar, Collapse } from '@material-tailwind/react'
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { NavList } from './NavList'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import { getMe, signOut } from '../../../apis/user'
import { useQuery } from 'react-query'
import LoginIcon from '@mui/icons-material/Login'
import AddIcon from '@mui/icons-material/Add'

export type HeaderProps = {
  //
}

export const Header: React.FC<HeaderProps> = () => {
  const [openNav, setOpenNav] = useState(false)
  const navigate = useNavigate()
  const { data: user, refetch } = useQuery(['user'], getMe, { retry: false })
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up('md'))

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const onLogout = useCallback(() => {
    void signOut().then(async (_) => {
      await refetch()
      location.href = '/login'
    })
  }, [])

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <header>
      <Navbar className="mx-auto my-2 max-w-[95%] px-4 py-2">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex">
            <div
              className="mr-2 flex cursor-pointer flex-col justify-center py-1.5 text-inherit lg:ml-2"
              onClick={() => navigate('/')}>
              <img src="/logo-a.svg" className="h-6" />
            </div>
            {user && (
              <div className="hidden lg:block">
                <NavList />
              </div>
            )}
          </div>
          <div className="flex">
            <div className="hidden gap-2 lg:flex">
              {user ? (
                <div className="flex items-center gap-3 text-gray-800">
                  <p className="gap-0.5">
                    <span className="font-bold">{user.name}</span>さん
                  </p>
                  <Box sx={{ flexGrow: 0 }}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar sx={{ bgcolor: user?.iconColor }}>
                        {user?.name ? user.name.charAt(0) : ''}
                      </Avatar>
                    </IconButton>
                    <Menu
                      sx={{ mt: '50px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}>
                      <MenuItem
                        onClick={() => {
                          handleCloseUserMenu()
                          onLogout()
                        }}>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>ログアウト</ListItemText>
                      </MenuItem>
                    </Menu>
                  </Box>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="lg:hidden">
              <IconButton className="lg:hidden" onClick={() => setOpenNav(!openNav)}>
                {openNav ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </div>
          </div>
        </div>
        <Collapse open={openNav} className="lg:hidden">
          {user && <NavList />}
          <div className="-mt-3 pl-4">
            <List disablePadding={md}>
              {user ? (
                <div className="mt-3">
                  <ListItemButton className="flex gap-4" onClick={onLogout}>
                    <ListItemIcon sx={{ minWidth: 0 }}>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText className="text-gray-700">ログアウト</ListItemText>
                  </ListItemButton>
                </div>
              ) : (
                <div className="mt-3">
                  <ListItemButton className="flex gap-4" onClick={() => navigate('/signup')}>
                    <ListItemIcon sx={{ minWidth: 0 }}>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText className="text-gray-700">サインイン</ListItemText>
                  </ListItemButton>

                  <div className="-mt-1">
                    <ListItemButton className="flex gap-4" onClick={() => navigate('/login')}>
                      <ListItemIcon sx={{ minWidth: 0 }}>
                        <LoginIcon />
                      </ListItemIcon>
                      <ListItemText className="text-gray-700">ログイン</ListItemText>
                    </ListItemButton>
                  </div>
                </div>
              )}
            </List>
          </div>
        </Collapse>
      </Navbar>
    </header>
  )
}
