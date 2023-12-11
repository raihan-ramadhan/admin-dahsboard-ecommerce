type Role = "user" | "admin" | "superadmin";

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  city: string;
  state: null;
  country: string;
  occupation: string;
  phoneNumber: string;
  transactions: string[];
  role: Role;
  __v: 0;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductStat = {
  _id: string;
  productId: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  monthlyData: {
    month: string;
    totalSales: number;
    totalUnits: number;
    _id: string;
  }[];
}[];

export type ProductType = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
  stat: ProductStat;
};

export type Products = ProductType[];

export type Customer = Omit<User, "password" | "role"> & { role: "user" };

export type Customers = Customer[];

export type TransactionProps = {
  page: number;
  pageSize: number;
  sort: string;
  search: string;
};

export type Transaction = {
  _id: string;
  userId: string;
  cost: string;
  products: string[];
  __v: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Transactions = {
  total: number;
  transactions: Transaction[];
};

export type Geography = {
  id: string;
  value: number;
}[];

export type Sales = {
  _id: string;
  totalCustomers: number;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: {
    month: string;
    totalSales: number;
    totalUnits: number;
    _id: string;
  }[];
  dailyData: {
    date: string;
    totalSales: number;
    totalUnits: number;
    _id: string;
  }[];
  salesByCategory: {
    shoes: number;
    clothing: number;
    accessories: number;
    misc: number;
  };
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type Admins = Omit<User, "password" | "role"> & { role: "admin" }[];

export type Performance = {
  user: {
    _id: string;
    name: string;
    email: string;
    password: string;
    city: string;
    state: null;
    country: string;
    occupation: string;
    phoneNumber: string;
    transactions: string[];
    role: Role;
    __v: number;
    createdAt: Date;
    updatedAt: Date;
    affiliateStats: {
      _id: string;
      userId: string;
      affiliateSales: string[];
      __v: number;
      createdAt: Date;
      updatedAt: Date;
    };
  };
  sales: {
    _id: string;
    userId: string;
    cost: string;
    products: string[];
    __v: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export type Dashboard = {
  totalCustomers: number;
  yearlyTotalSoldUnits: number;
  yearlySalesTotal: number;
  monthlyData: [
    {
      month: string;
      totalSales: number;
      totalUnits: number;
    }
  ];
  salesByCategory: {
    type: Record<number | string, string>;
    of: number;
  };
  thisMonthStats: {
    month: string;
    totalSales: number;
    totalUnits: number;
    _id: string;
  };
  todayStats: {
    date: string;
    totalSales: number;
    totalUnits: number;
    _id: string;
  };
  transactions: Transaction[];
};
