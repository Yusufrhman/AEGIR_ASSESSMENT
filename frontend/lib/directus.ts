
import {
  authentication,
  createDirectus,
  readUsers,
  rest,
  staticToken,
} from "@directus/sdk";
import { getServerSession } from "next-auth";
import { options } from "./auth/options";
import { UserRole } from "@/types/user";
import axios from "axios";

export const directus = (token: string = "") => {
  if (token) {
    return createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_API ?? "")
      .with(staticToken(token))
      .with(rest());
  }
  return createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_API ?? "")
    .with(
      authentication("cookie", { credentials: "include", autoRefresh: true })
    )
    .with(rest());
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_API}/auth/login`,
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    }
  );
  const user = await res.json();
  if (!res.ok && user) {
    throw new Error("Email address or password is invalid");
  }
  if (res.ok && user) {
    return user?.data;
  }
};

export async function getAllUsers(filter?: {}, limit = 10, page = 1) {
  try {
    const session = await getServerSession(options);

    if (!session || !session.access_token) {
      throw new Error("Session not found or invalid access token.");
    }
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_DIRECTUS_API}/users?fields=id,first_name,last_name,email,status,role.name,last_access&limit=${limit}&page=${page}&meta=total_count`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    return result.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user. Please try again later.");
  }
}

export async function countUsers(role: UserRole) {
  try {
    const session = await getServerSession(options);

    if (!session || !session.access_token) {
      throw new Error("Session not found or invalid access token.");
    }
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_DIRECTUS_API}/users?filter[role][name]=${role}&meta=filter_count&limit=0`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );
    return result.data.meta.filter_count;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

export async function countInstrument() {
  try {
    const session = await getServerSession(options);

    if (!session || !session.access_token) {
      throw new Error("Session not found or invalid access token.");
    }
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_DIRECTUS_API}/items/instruments?limit=0&meta=total_count`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );
    return result.data.meta.total_count;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

export async function countStudentAndTeacherByInstrument(limit = 5, page = 1) {
  try {
    const session = await getServerSession(options);

    if (!session || !session.access_token) {
      throw new Error("Session not found or invalid access token.");
    }
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_DIRECTUS_API}/items/instruments?fields=name,count(students),count(teachers)&limit=${limit}&page=${page}&meta=total_count`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

export async function countPackages(status?: string) {
  if (!status) {
    status = "draft";
  }
  try {
    const session = await getServerSession(options);

    if (!session || !session.access_token) {
      throw new Error("Session not found or invalid access token.");
    }
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_DIRECTUS_API}/items/packages?filter[status][_eq]=${status}&meta=filter_count&limit=0`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );
    return result.data.meta.filter_count;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
}
export async function countLessons() {
  try {
    const session = await getServerSession(options);

    if (!session || !session.access_token) {
      throw new Error("Session not found or invalid access token.");
    }
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_DIRECTUS_API}/items/lessons?meta=filter_count&limit=0`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );
    return result.data.meta.filter_count;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
}
export async function sumPayment() {
  try {
    const session = await getServerSession(options);

    if (!session || !session.access_token) {
      throw new Error("Session not found or invalid access token.");
    }
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_DIRECTUS_API}/items/payments?aggregate[sum]=rate`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );
    return result.data.data[0].sum.rate;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
}
