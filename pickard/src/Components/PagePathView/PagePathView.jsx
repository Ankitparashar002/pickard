// src/App.js
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./PagePathView.module.css";

function PagePathView({ startDate, endDate }) {
  const [pageData, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formattedStart = startDate.toISOString().split("T")[0];
  const formattedEnd = endDate.toISOString().split("T")[0];
  const baseUrl = "https://localhost:7050/api/RunReport/GetPagePathReport";

  const url = `${baseUrl}?StartDate=${formattedStart}&EndDate=${formattedEnd}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();

        // Assuming the API response is in the format you provided
        if (result.success && result.data) {
          // Transform the API response into the format needed for rendering
          const transformedData = Object.entries(result.data).map(
            ([path, pageViews]) => ({
              path,
              pageViews: parseInt(pageViews, 10), // Convert string to number
            })
          );
          setPageData(transformedData);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Re-fetch if the URL changes (i.e., startDate or endDate changes)

  if (loading) {
    return (
      <div className={style.loaderContainer}>
        <div className={style.spinner}></div>
        <p className={style.acquiringText}>Acquiring...</p>
      </div>
    );
  }

  return (
    <div className={`${style.page_view} container`}>
      <div className={`${style.page_view_heading}`}>
        <h4 className="mb-0">PAGE VIEW</h4>
      </div>

      <div className={`${style.page_view_data} container mt-4`}>
        <h5
          className={`text-muted pt-3 pb-2 m-0 ${style.page_view_sub_heading}`}
        >
          TOP VIEWS BY PAGE PATH
        </h5>
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th className="p-0 border-bottom-0">
                Page Path Without Query String
              </th>
              <th></th>
              <th className="border-bottom-0 p-0">Views</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((item, idx) => (
              <tr key={idx}>
                <td
                  className={`${style.path_view_path} p-0 border-bottom-0 text-muted`}
                >
                  {item.path}
                </td>
                <td
                  className={`${style.path_view_value} p-0 border-bottom-0 text-end`}
                >
                  {item.pageViews.toLocaleString()}
                </td>
                <td
                  className={`${style.path_view_diff} p-0 border-bottom-0 text-center`}
                ></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PagePathView;
