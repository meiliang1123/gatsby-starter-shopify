import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchRequest } from "@utils/fetch.js"
import dayjs from 'dayjs'

import {
  // ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import "./index.less"
 
const TABLE_HEAD = ["Transaction", "Commodity", "Amount", "Date", "Status", "Account", ""];
 
const TABLE_ROWS = [
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    name: "Spotify",
    amount: "$2,500",
    date: "Wed 3:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
];

const Account = () => {
  const { getAccessTokenSilently, user, isAuthenticated, /* isLoading, */ } = useAuth0()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently()
      .then(token => console.log("Access token refreshed:====="))
      .catch(err => console.error("Error refreshing token:=====", err));
    }
  }, [isAuthenticated, getAccessTokenSilently])
  
  useEffect(() => {
    if(user?.email){
      fetchUserOrders()
    }
  }, [user])

  const rows = orders.map(item => {
    return {
      ...item,
      img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
      amount: `${item.presentment_currency}${item.total_price}`,
      commodity: item.line_items?.map(i => i.name).join(","),
      date: dayjs(item.created_at).format("YYYY/MM/DD HH:mm:SS"),
      status: "paid",
      account: item.payment_gateway_names.join(" "),
      accountNumber: item.order_number,
      expiry: "06/2026",
    }
  })

  const fetchUserOrders = async () => {
    const res = await fetchRequest(`${process.env.GATSBY_WORKER_DOMIN}/shopify/orders`,{
      queryParams: {
        email: user?.email
      }
    })
    if(res && res.status === 200){
      setOrders(res.data || [])
    }
  };

  return <div className="account-container">
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recent Transactions
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last transactions
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                aria-label="order Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(
              (
                {
                  img,
                  name,
                  amount,
                  commodity,
                  date,
                  status,
                  account,
                  accountNumber,
                  expiry,
                },
                index,
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={img}
                          alt={name}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {commodity}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {amount}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={status}
                          color={
                            status === "paid"
                              ? "green"
                              : status === "pending"
                              ? "amber"
                              : "red"
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                          <Avatar
                            src={
                              account === "visa"
                                ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                            }
                            size="sm"
                            alt={account}
                            variant="square"
                            className="h-full w-full object-contain p-1"
                          />
                        </div>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {account?.split("-").join(" ")} {accountNumber}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {expiry}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text" aria-label="Edit User">
                          {/* <PencilIcon className="h-4 w-4" /> */}
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm" aria-label="Go to page 1">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm" aria-label="Go to page 1">
            1
          </IconButton>
          <IconButton variant="text" size="sm" aria-label="Go to page 1">
            2
          </IconButton>\
          <IconButton variant="text" size="sm" aria-label="Go to page 1">
            ...
          </IconButton>
        </div>
        <Button variant="outlined" size="sm" aria-label="Go to page 1">
          Next
        </Button>
      </CardFooter>
    </Card>
  </div>
}

export default Account;