import React, { useState } from 'react';
import { Box, Button, Card, Divider, Typography, Tabs, Tab } from '@mui/material';
import { KeyboardBackspace } from '@mui/icons-material';
import PageLayout from 'components/PageLayout';
import ProfileDetailsScreen from './ProfileDetailsScreen';
import { useRouter } from 'next/router';
import ProfileDocumentScreen from './ProfileDocumentsScreen';
import GoalsScreen from './GoalsScreen';
import SalaryHistoryScreen from './SalaryHistoryScreen';
// import PersonalInfo from './AgentInfoForms/PersonalInfo';
// import AgentCode from './AgentInfoForms/AgentCode';
// import Licensing from './AgentInfoForms/Licensing';
// import Education from './Education';

interface TabPanelProps {
    children?: React.ReactNode;
    value: number;
    index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
};

const Profile = () => {
    const router = useRouter()
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <PageLayout>
            <Box sx={{m:2}}>
                {/* <Card sx={{ p: 2 }}> */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between',alignItems:"center",gap:1,flexDirection:{xs:"column",sm:"row"} }}>
                        <Typography sx={{ fontSize: 22, fontWeight: 600 }}>Profile</Typography>
                        <Button startIcon={<KeyboardBackspace />} onClick={()=>router.push("/profile")} variant="contained">
                            Go Back
                        </Button>
                    </Box>
                    <Divider sx={{ my: 3 }} />
                    <Tabs sx={{
                    background: '#dfe5ec',
                    borderRadius: '8px',
                    px: 2,

                    '& .Mui-selected': {
                        background: '#fff',
                        padding: '5px 15px',
                        margin: '8px 0',
                        minHeight: '20px',
                        borderRadius: '10px',
                        fontWeight: '900'
                    },
                    '& .MuiTabs-indicator': {
                        width: '0px !important'
                    }
                }} value={value} onChange={handleChange}>
                        <Tab label="Details" value={0} />
                        <Tab label="Documents" value={1} />
                        <Tab label="Goals" value={2} />
                        <Tab label="Salary History" value={3} />
                    </Tabs>
                {/* </Card> */}
                <TabPanel value={value} index={0}>
                    <ProfileDetailsScreen />
                </TabPanel>
                <TabPanel value={value} index={1}> <ProfileDocumentScreen /> </TabPanel>
            <TabPanel value={value} index={2}> <GoalsScreen /> </TabPanel>
            <TabPanel value={value} index={3}> <SalaryHistoryScreen /> </TabPanel>
            </Box>
        </PageLayout>
    );
};

export default Profile;
