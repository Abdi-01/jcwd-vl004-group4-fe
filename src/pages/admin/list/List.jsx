import "./list.scss";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Datatable from "../../../components/admin/datatable/Datatable";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Datatable />
      </div>
    </div>
  );
};

export default List;
