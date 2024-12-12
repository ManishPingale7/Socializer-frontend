// import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */

const TableRow = ({ name, interests, contact, address, id, handleDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}/`);
  };
  const handleSummary = (id) => {
    console.log(id);

    navigate(`/profiles/${id.id}`);
  };

  return (
    <>
      <tr className="border-b dark:border-gray-700">
        <th
          scope="row"
          className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {name}
        </th>
        <td className="px-3 py-3">{interests}</td>
        <td className="px-3 py-3">{contact}</td>
        <td className="px-3 py-3">{address}</td>
        <td className="px-2 py-3">
          <button
            type="button"
            onClick={() => {
              handleSummary({ id });
            }}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center me-1 mb-1 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Summary
          </button>
        </td>

        <td className="px-1 py-3 2 ">
          <button
            onClick={() => {
              handleEdit(id);
            }}
          >
            <img
              className="w-10 h-10"
              src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png"
            />
          </button>
        </td>

        <td className="px-1 py-3 2 ">
          <button
            onClick={() => {
              handleDelete(id);
            }}
          >
            <img
              className="w-7 h-8"
              src="https://icons.veryicon.com/png/o/commerce-shopping/small-icons-with-highlights/delete-184.png"
            />
          </button>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
