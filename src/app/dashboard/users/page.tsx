import { Pagination, Search } from "@/components";
import { fetchUsers } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const UsersPage = async () => {
  let users;
  try {
    users = await fetchUsers();
  } catch (error) {
    return <div>Error fetching users.</div>;
  }

  return (
    <div className="bg-bgSoft p-5 rounded-lg mt-5">
      <div className="flex items-center justify-between mb-5">
        <Search placeholder={"Search for a user"} />
        <Link href="/dashboard/users/adduser">
          <button className="p-2.5 bg-[#5d57c9] border-none rounded-md cursor-pointer text-white">
            Add New
          </button>
        </Link>
      </div>
      <table className="w-full table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-2.5">
                    <Image
                      src={user.img || "./noproduct.jpg"}
                      alt="no image"
                      height={40}
                      width={40}
                      className="rounded-full object-cover"
                    />
                    {user.username}
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>{user.isAdmin ? "Admin" : "User"}</td>
                <td>{user.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <div className="flex gap-2.5">
                    <Link href={`/dashboard/users/${user._id}`}>
                      <button className="py-1.5 px-2.5 rounded-md text-white border-none cursor-pointer bg-teal-500">
                        View
                      </button>
                    </Link>
                    <button className="py-1.5 px-2.5 rounded-md text-white border-none cursor-pointer bg-red-600">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default UsersPage;
