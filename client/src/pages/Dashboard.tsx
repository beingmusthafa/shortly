import { useEffect, useState } from "react";
import Link from "../types/link.type";
import LinkCard from "../components/LinkCard";
import AddLink from "../components/AddLink";
import axiosInstance from "../config/axios.config";
import Loading from "../components/Loading";
import Confirmation from "../components/Confirmation";

const Dashboard = () => {
  const [showAddLink, setShowAddLink] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string>("");
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

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = (await axiosInstance.delete("/delete-link/" + selected)).data;
      if (!res.success) throw new Error(res.message);
      setLinks(links.filter((link) => link._id !== selected));
    } catch (error) {
      console.log(error);
    } finally {
      setShowDeleteConfirm(false);
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
      {showAddLink && (
        <AddLink setShow={setShowAddLink} fetchData={fetchLinks} />
      )}
      {showDeleteConfirm && (
        <Confirmation
          text="Delete this link?"
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
        />
      )}
      <button
        onClick={() => setShowAddLink(true)}
        className="bg-orange-500 m-4  font-semibold text-white p-2 text-sm"
      >
        Add link
      </button>

      <div className="flex flex-col gap-8 mx-auto w-fit">
        {links.length > 0 ? (
          links.map((link) => (
            <LinkCard
              key={link._id}
              link={link}
              onDelete={() => {
                setSelected(link._id);
                setShowDeleteConfirm(true);
              }}
            />
          ))
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
