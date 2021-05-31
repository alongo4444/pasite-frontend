import React from "react";
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import {BsShieldShaded} from 'react-icons/bs';
import {SiMicrogenetics, SiHubspot} from 'react-icons/si';
import {GiDrippingTube} from 'react-icons/gi';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',

    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

/**
 * the menu of the different correlations
 */
export default function DrawerCorrelation({generatingTypeHandler}) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        if (open == true) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    };

    return (
        <div className={classes.root}>
            <Drawer
                PaperProps={{style: {position: 'absolute', height: '83.5%', marginTop: '4.5%'}, width: '70%'}}
                BackdropProps={{style: {position: 'absolute'}}}
                ModalProps={{
                    container: document.getElementById('drawer'),
                    style: {position: 'absolute'}
                }}
                anchor='right'
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton id="drawerBut" onClick={handleDrawerOpen}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                    Choose Display:
                </div>
                <Divider/>
                <List>

                    <ListItem  button key="dvd" id="dvd" onClick={() => generatingTypeHandler("dvd")}>
                            <ListItemIcon>
                                <BsShieldShaded/><BsShieldShaded/>
                            </ListItemIcon>
                            <ListItemText primary="Defense system vs Defense system"/>

                    </ListItem>
                    <ListItem button key="dvc" id="dvc" onClick={() => generatingTypeHandler("dvc")}>
                        <ListItemIcon><BsShieldShaded/><SiHubspot/></ListItemIcon>
                        <ListItemText primary="Defense system vs Attribute"/>
                    </ListItem>
                    <ListItem button key="dvi" id="dvi" onClick={() => generatingTypeHandler("dvi")}>
                        <ListItemIcon><BsShieldShaded/><GiDrippingTube/></ListItemIcon>
                        <ListItemText primary="Defense system vs Isolation Type"/>
                    </ListItem>
                    <ListItem button key="dvcl" id="dvcl" onClick={() => generatingTypeHandler("dvcl")}>
                        <ListItemIcon><BsShieldShaded/><SiMicrogenetics/></ListItemIcon>
                        <ListItemText primary="Defense system vs Cluster"/>
                    </ListItem>
                    <ListItem button key="clvi" id="clvi" onClick={() => generatingTypeHandler("clvi")}>
                        <ListItemIcon><SiMicrogenetics/><GiDrippingTube/></ListItemIcon>
                        <ListItemText primary="Cluster vs Isolation Type"/>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}