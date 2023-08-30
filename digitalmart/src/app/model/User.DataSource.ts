import { User } from "./User";
import { Order } from "./Order";
import { RoleList } from "./Role.DataSource";
export const UserList:User[]=[
    {Id:1,FirstName:'your',LastName:'email',Email:'youremail@gmail.com',Password:'saipwd',ImagePath:"https://i.hizliresim.com/dljd92z.png",Orders:[],Role:RoleList[0]},
    {Id:2,FirstName:'Guest',LastName:'Guest',Email:'guestguest',Password:'guestguest',ImagePath:"https://i.hizliresim.com/dljd92z.png",Orders:[],Role:RoleList[0]},
    {Id:3,FirstName:'sai',LastName:'ram',Email:'sairam@gmail.com',Password:'sairam',ImagePath:"https://i.hizliresim.com/395monw.png",Orders:[],Role:RoleList[0]},
    {Id:4,FirstName:'ram',LastName:'sai',Email:'ramsai@gmail.com',Password:'ramsai',ImagePath:"https://i.hizliresim.com/qouek8c.png",Orders:[],Role:RoleList[0]},
    {Id:5,FirstName:'admin',LastName:'admin',Email:'admin',Password:'admin',ImagePath:"https://i.hizliresim.com/qouek8c.png",Orders:[],Role:RoleList[1]},
]