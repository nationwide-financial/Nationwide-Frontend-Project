import React, { useState, useContext } from 'react';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import GridViewIcon from "@mui/icons-material/GridView";
import TaskIcon from "@mui/icons-material/Task";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import { SvgIconProps } from '@mui/material/SvgIcon';
import Archive from '@mui/icons-material/Archive';
import Link from 'next/link';
import { ExpandLess } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Router from 'next/router';
import { Avatar } from '@mui/material';
import { Context } from "../context";


// declare module 'react' {
//   interface CSSProperties {
//     '--tree-view-color'?: string;
//     '--tree-view-bg-color'?: string;
//   }
// }

// type StyledTreeItemProps = TreeItemProps & {
//   bgColor?: string;
//   color?: string;
//   labelIcon?: React.ElementType<SvgIconProps>;
//   labelInfo?: string;
//   labelText: string;
// };

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.MuiTreeItem-content': {
      flexDirection: 'row-reverse',
      color: '#1478F1'
    },
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: '#1478F1',
      color: 'white !important'
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: '#1478F1',
      color: 'white !important'
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0, pt: 1.5, pb: 1.5 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}


const Sidebar = () => {
  const {state} = useContext(Context);
  const profile = state?.user || {}

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const menuItems = [
    {
      path: "/",
      name: "Dashboard",
      icon: HomeOutlinedIcon
    },
    {
      path: "/contact",
      name: "Contacts",
      icon: ContentCopyIcon
    },
    // {
    //   path: "/analytics",
    //   name: "Applications",
    //   icon: GridViewIcon
    // },
    {
      path: "/application/dashbord",
      name: "Applications",
      icon: GridViewIcon
    },
    {
      path: "/tasks",
      name: "Tasks",
      icon: TaskIcon
    },
    {
      path: "#",
      name: "Emails",
      icon: MailOutlineIcon
    },
    {
      path: "",
      name: "Configurations",
      icon: FileCopyIcon,
      hastree: true,
      treeitems: [
        {
          path: "/variables",
          name: "Variables",
          icon: MailOutlineIcon
        },
        {
          path: "",
          name: "Team",
          icon: PeopleOutlineIcon,
          hastree: true,
          treeitems: [
            {
              path: "/team/platform-users",
              name: "Platform Users"
            }
          ]
        },
        {
          path: "",
          name: "Loan Products",
          icon: Archive,
          hastree: true,
          treeitems: [
            {
              path: "/loan-product/loan-type",
              name: "Loan Type",
            },
            {
              path: "/loan-product/workflow-status",
              name: "Workflow Statuses",
            },
            {
              path: "/loan-product/application-label",
              name: "Application Label",
            },
            {
              path: "/loan-product/rejection-option",
              name: "Rejection Option",
            }
          ]
        }
      ]
    },
    
   
  ]

  const treeFunction = (menuList, num) => {
    return menuList.map((item, index) => (
      <>
        {item.hastree
          ?
          <>
            <StyledTreeItem nodeId={`${num}-${index + 1}`} labelText={item.name} labelIcon={item.icon}>
                   {treeFunction(item.treeitems, index + 1)}
                   
              {/* {item.treeitems.map((treeitem, treeindex) => (
                <>
                  {treeitem.hastree ? treeFunction(item.treeitems) :
                    <Link href={treeitem.path}>
                      <StyledTreeItem nodeId={index + 1 + '-' + treeindex + 1} labelText={treeitem.name} />
                    </Link>
                  }
                </>
              ))} */}
            </StyledTreeItem>
          </>
          :
          <>
            <Link href={item.path}>
              <StyledTreeItem nodeId={`${num}-${index + 1}`} labelText={item.name} labelIcon={item.icon} />
            </Link>
          </>
        }

      </>
    ))
  }

  return (
    <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
      <div className="top_section">
        <div style={{ display: isOpen ? "block" : "none" }} className="logo">
          <Image alt="logo" className='logoimg' src="/assets/logo.svg" width={164} height={80} />
        </div>
        {/* <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FileCopyIcon onClick={toggle} />
          </div> */}
      </div>
      {/* <TreeView
        aria-label="gmail"
        defaultExpanded={['3']}
        defaultCollapseIcon={<ExpandLess />}
        defaultExpandIcon={<ExpandMoreIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{ flexGrow: 1, maxWidth: 224 }}
      >
        {
          menuItems.map((item, index) => (
            <>
              {item.hastree
                ?
                <>
                  <StyledTreeItem nodeId={`${index + 1}`} labelText={item.name} labelIcon={item.icon}>
                    {item.treeitems.map((treeitem, treeindex) => (
                      <>
                        <Link href={treeitem.path}>
                          <StyledTreeItem nodeId={index + 1 + '-' + treeindex + 1} labelText={treeitem.name} />
                        </Link>
                      </>
                    ))}
                  </StyledTreeItem>
                </>
                :
                <>
                  <Link href={item.path}>
                    <StyledTreeItem nodeId={`${index + 1}`} labelText={item.name} labelIcon={item.icon} />
                  </Link>
                </>
              }

            </>
          ))
        }
      </TreeView> */}

      <TreeView
        defaultExpanded={['3']}
        defaultCollapseIcon={<ExpandLess />}
        defaultExpandIcon={<ExpandMoreIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{ flexGrow: 1, maxWidth: 224 }}
      >
        {
         treeFunction(menuItems, 1)
        }
      </TreeView>

        <Box sx={{ mt:4, ml:2 }}>
          <Link style={{display: "flex", alignItems: "center"}} href="/my-account">
              <Avatar sx={{ mr:1 }} alt="profile" src="/images/profile.png" /> 
              <b>{profile?.info?.firstName || "user"}</b>
          </Link>
        </Box>
        

      <Button size='small' variant="contained" sx={{ mt:4, ml:2 }} onClick={()=>{
        document.cookie = "token" + '=; Max-Age=0';
        Router.push('/login');
      }}>Logout</Button>
    
    </div>
  );
};

export default Sidebar;