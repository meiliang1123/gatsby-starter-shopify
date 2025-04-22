import React, { useEffect, useState } from "react";
import { Link } from 'gatsby'
import { useAuth0 } from "@auth0/auth0-react";
import { 
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { CgMail, CgMenuBoxed, CgLogOff } from "react-icons/cg";
import "./index.less"

const defaultAuatarPngAsset = "/default_avatar.png"
const AccountButton = () => {
  const {  loginWithRedirect, getAccessTokenSilently, logout, user, isAuthenticated, /* isLoading */ } = useAuth0()
  const [openPopover, setOpenPopover] = React.useState(false);
  const [imgSrc, setImgSrc] = useState(defaultAuatarPngAsset)

  useEffect(() => {
    if (!isAuthenticated) {
      getAccessTokenSilently()
        .then(token => {
          console.log("Access token refreshed:=====")
        })
        .catch(err => console.error("Error refreshing token:=====", err));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setImgSrc(user?.picture || defaultAuatarPngAsset)
  }, [user])

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  // 登出
  const onLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return <Popover open={openPopover} handler={setOpenPopover} placement="bottom-end">
    <PopoverHandler {...triggers} className="cursor-pointer inline-block relative object-cover object-center !rounded-full w-8 h-8 ml-3 rounded-lg">
      <img
        alt="avatar"
        src={imgSrc} onError={() => setImgSrc(defaultAuatarPngAsset)}
      />
    </PopoverHandler>
    <PopoverContent className="w-72 z-[1001]" {...triggers}>
      {isAuthenticated && <div className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4">
          <img 
            alt="avatar"
            className="inline-block relative object-cover object-center !rounded-full w-12 h-12 rounded-lg" 
            src={imgSrc} onError={() => setImgSrc(defaultAuatarPngAsset)}
          />
          <div>
            <Typography variant="h6" color="blue-gray">
              {user.name}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="font-medium text-blue-gray-500"
            >
              {user?.nickname}
            </Typography>
          </div>
        </div>
      }
      <List className="p-0">
        {
          isAuthenticated && <React.Fragment>
            <ListItem>
              <ListItemPrefix>
                <CgMail />
              </ListItemPrefix>
              {user?.email}
            </ListItem>
            <Link to="/account">
              <ListItem>
                <ListItemPrefix>
                  <CgMenuBoxed />
                </ListItemPrefix>
                Orders
              </ListItem>
            </Link>
            <ListItem>
              <ListItemPrefix>
                <CgLogOff />
              </ListItemPrefix>
              <button aria-label="log out" onClick={onLogout}>Log out</button>
            </ListItem>
          </React.Fragment>
        }
        {
          !isAuthenticated && <ListItem>
            <ListItemPrefix>
              <CgLogOff />
            </ListItemPrefix>
            <button aria-label="log out" onClick={() => loginWithRedirect() }>Sign in</button>
          </ListItem>
        }
      </List>
    </PopoverContent>
  </Popover>
}

export default AccountButton