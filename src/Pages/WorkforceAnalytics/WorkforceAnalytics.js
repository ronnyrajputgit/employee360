// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
// Overview page components
// import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
// Data
import profilesListData from "layouts/profile/data/profilesListData";
// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import { Avatar, Card, Icon } from "@mui/material";
import SkillInventory from "./Components/SkillInventory/SkillInventory";
import TechnicalWorkforce from "./Components/TechnicalWorkforce/TechnicalWorkforce";
import EmployeeDistribution from "./Components/EmployeeDistribution/EmployeeDistribution";
import ProductivityMetrics from "./Components/ProductivityMetrics/ProductivityMetrics";
import WorkforceAllocation from "./Components/WorkforceAllocation/WorkforceAllocation";
import LeavesAndAttendance from "./Components/LeavesAndAttendance/LeavesAndAttendance";
import CompensationData from "./Components/CompensationData/CompensationData";

function WorkforceAnalytics() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      {/* <Header> */}
      <MDBox mt={5} mb={3}>
        <SkillInventory />
      </MDBox>
      <MDBox mt={5} mb={3}>
        <TechnicalWorkforce />
      </MDBox>
      <MDBox mt={5} mb={3}>
        <EmployeeDistribution />
      </MDBox>
      <MDBox mt={5} mb={3}>
        <ProductivityMetrics />
      </MDBox>
      <MDBox mt={5} mb={3}>
        <WorkforceAllocation />
      </MDBox>
      <MDBox mt={5} mb={3}>
        <CompensationData />
      </MDBox>
      <MDBox mt={5} mb={3}>
        <LeavesAndAttendance />
      </MDBox>
      {/* </Header> */}
      <Footer />
    </DashboardLayout>
  );
}

export default WorkforceAnalytics;
