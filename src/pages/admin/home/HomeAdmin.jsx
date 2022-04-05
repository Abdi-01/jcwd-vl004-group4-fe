import Sidebar from "../../../components/admin/sidebar/Sidebar";
import "./home.scss";
import Table from "../../../components/admin/table/Table";

const HomeAdmin = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
