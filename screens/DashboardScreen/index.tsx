import { Box, Grid, Typography } from "@mui/material";
import PageLayout from "components/PageLayout";
import FormattedMessage from "theme/FormattedMessage";

import { cardData, messageData, todaysTasks } from "./data";
import messages from "./messages";
import TodayTask from "./TodayTask";
import ProjectProgress from "./ProjectProgress";
import AchievementCard from "./AchievementCard";
import RecentMessage from "./RecentMessage";
import { useMyTaskListing } from "providers/Project/Task";
import { useMe } from "providers/Login";

const DashboardScreen: React.FC = () => {
  const todayTasks = useMyTaskListing({});
  const me = useMe({});
  console.log(me,"me")
  console.log(todayTasks,"takss")
  return (
    <>
      <PageLayout>
        <Box sx={{ padding: "20px",background:theme=>theme.palette.background.default }}>
          {/* <Grid container spacing={3} mb={3}>
            <AchievementCard />
          </Grid> */}
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12}>
              <TodayTask
                title={<FormattedMessage {...messages.newsTitle} />}
                subheader={<FormattedMessage {...messages.newsSubTitle} />}
                button={<FormattedMessage {...messages.newsButton} />}
                list={todayTasks?.data?.data || []}
              />
            </Grid>
            <Grid item xs={12}>
              <RecentMessage
                title={<FormattedMessage {...messages.orderTimelineTitle} />}
                subheader={
                  <FormattedMessage {...messages.orderTimelineSubTitle} />
                }
                list={messageData}
              />
            </Grid>
          </Grid>
          {/* <Grid container spacing={3} mb={3}>
            <Grid item xs={12}>
              <ProjectProgress title={<FormattedMessage {...messages.saleTitle} />} />
            </Grid> */}
            {/* <Grid item sm={12} md={4}>
              <RevenueChart
                title={<FormattedMessage {...messages.revenueTitle} />}
              />
            </Grid> */}
          {/* </Grid> */}
        </Box>
      </PageLayout>
    </>
  );
};

export default DashboardScreen;
