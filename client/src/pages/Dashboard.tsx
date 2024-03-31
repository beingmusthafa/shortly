import { useEffect, useState } from "react";
import Link from "../types/link.type";
import LinkCard from "../components/LinkCard";
import AddLink from "../components/AddLink";
import axiosInstance from "../config/axios.config";
import Loading from "../components/Loading";

const Dashboard = () => {
  const [showAddLink, setShowAddLink] = useState(false);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = (await axiosInstance.get("/get-all-links")).data;
      if (!res.success) throw new Error(res.message);
      setLinks(res.data.links);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLinks();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <>
      <button
        onClick={() => setShowAddLink(true)}
        className="bg-orange-500 m-4  font-semibold text-white p-2 text-sm"
      >
        Add link
      </button>
      {showAddLink && (
        <AddLink setShow={setShowAddLink} fetchData={fetchLinks} />
      )}
      <div className="flex flex-col gap-8 mx-auto w-fit">
        {links.length > 0 ? (
          links.map((link) => <LinkCard link={link} />)
        ) : (
          <p className="mt-[30vh] text-slate-400 font-semibold text-2xl mx-auto">
            No links added
          </p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
