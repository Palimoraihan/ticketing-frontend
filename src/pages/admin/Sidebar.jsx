import { MdDashboard, MdGroup } from "react-icons/md";
const Sidebar = ({ children }) => {
  return (
    <>
      <div className="row">
        <div className="bg-white shadow-sm col-1 sidebar position-fixed">
          <ul>
            <li>
              <a href="/">
                <MdDashboard className="me-2" />
                Home
              </a>
            </li>
            <li>
              <a href="">
                <MdGroup className="me-2" /> Group
              </a>
            </li>
          </ul>
        </div>
        <div className="col position-absolute">{children}</div>
      </div>
    </>
  );
};

export default Sidebar;
