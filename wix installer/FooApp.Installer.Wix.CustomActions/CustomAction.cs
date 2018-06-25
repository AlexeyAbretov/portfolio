using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Windows.Forms;
using Microsoft.Deployment.WindowsInstaller;
using Microsoft.Web.Administration;
using Microsoft.Win32;

namespace FooApp.Installer.Wix.CustomActions
{
    public class CustomActions
    {
        [CustomAction]
        public static ActionResult TestConnection(Session xiSession)
        {
            string connectionString = "Initial Catalog=master;Data Source={0};persist security info=True; Integrated Security=SSPI;";

            xiSession["DB_SERVER_NAME"] = xiSession["SQL_SERVERS"];

            string fillConnectionString =
                string.Format(connectionString,
                    xiSession["DB_SERVER_NAME"]);

            try
            {
                using (var connection = new SqlConnection(fillConnectionString))
                {
                    connection.Open();

                    xiSession["DB_CONNECTION_SUCCESS"] = connection.State == ConnectionState.Open ? "1" : "0";

                    if (connection.State == ConnectionState.Open)
                    {
                        MessageBox.Show("Соединение успешно установлено.");
                    }
                }
            }
            catch (Exception ex)
            {
                xiSession["DB_CONNECTION_SUCCESS"] = "0";
                MessageBox.Show(
                    string.Format("Ошибка подключения к БД ({0}), ошибка: {1}.",
                        fillConnectionString, ex.Message));
            }

            return ActionResult.Success;
        }

        [CustomAction]
        public static ActionResult TestConnectionWebMode(Session xiSession)
        {
            string connectionString = "Data Source={0};Initial Catalog={1};User ID={2};Password={3}";
            string fillConnectionString =
                string.Format(connectionString,
                    xiSession["DB_SERVER_NAME"],
                    xiSession["DB_NAME"],
                    xiSession["DB_LOGIN"],
                    xiSession["DB_PASSWORD"]);

            try
            {
                using (var connection = new SqlConnection(fillConnectionString))
                {
                    connection.Open();

                    xiSession["DB_CONNECTION_SUCCESS"] = connection.State == ConnectionState.Open ? "1" : "0";

                    if (connection.State == ConnectionState.Open)
                    {
                        MessageBox.Show("Соединение успешно установлено.");
                    }
                }
            }
            catch (Exception ex)
            {
                xiSession["DB_CONNECTION_SUCCESS"] = "0";
                MessageBox.Show(
                    string.Format("Ошибка подключения к БД ({0}), ошибка: {1}.",
                        fillConnectionString, ex.Message));
            }

            return ActionResult.Success;
        }

        [CustomAction]
        public static ActionResult CheckDbDialog(Session xiSession)
        {
            //System.Diagnostics.Debugger.Launch();

            xiSession["DB_DIALOG_SUCCESS"] = "1";

            string connectionString = "Initial Catalog=master;Data Source={0};persist security info=True; Integrated Security=SSPI;";
            string fillConnectionString =
                string.Format(connectionString,
                    xiSession["DB_SERVER_NAME"]);

            xiSession["DB_LOGIN_FIXED"] = "[" + xiSession["DB_LOGIN"] + "]";

            try
            {
                using (var connection = new SqlConnection(fillConnectionString))
                {
                    connection.Open();

                    string cmdText = @"select CAST(LEFT(CAST(SERVERPROPERTY('ProductVersion') AS NVARCHAR(MAX)),
                        CHARINDEX('.',CAST(SERVERPROPERTY('ProductVersion') AS NVARCHAR(MAX))) - 1) AS INT)";

                    using (SqlCommand sqlCmd = new SqlCommand(cmdText, connection))
                    {
                        object nRet = sqlCmd.ExecuteScalar();

                        if (nRet != null)
                        {
                            int majorVersion = 0;
                            int.TryParse(nRet.ToString(), out majorVersion);

                            if (majorVersion < 11)
                            {
                                MessageBox.Show(
                                    "Неподдерживаемая версия SQL Server. Необходима версия не ниже SQL Server 2012.");
                                xiSession["DB_DIALOG_SUCCESS"] = "0";
                                return ActionResult.Success;
                            }
                        }
                    }

                    cmdText = "select 1 from master.dbo.sysdatabases where name=\'" + xiSession["DB_NAME"] + "\'";

                    using (SqlCommand sqlCmd = new SqlCommand(cmdText, connection))
                    {
                        object nRet = sqlCmd.ExecuteScalar();

                        if (nRet != null)
                        {
                            MessageBox.Show(string.Format("БД '{0}' уже существует.",
                                xiSession["DB_NAME"]));
                            xiSession["DB_DIALOG_SUCCESS"] = "0";
                            return ActionResult.Success;
                        }
                    }

                    cmdText = "select name from master.sys.sql_logins where name = @loginName";

                    using (SqlCommand sqlCmd = new SqlCommand(cmdText, connection))
                    {
                        SqlParameter param = new SqlParameter();
                        param.ParameterName = "@loginName";
                        param.Value = xiSession["DB_LOGIN"];
                        sqlCmd.Parameters.Add(param);

                        object nRet = sqlCmd.ExecuteScalar();

                        if (nRet != null)
                        {
                            MessageBox.Show(string.Format("Пользователь '{0}' уже существует.",
                                xiSession["DB_LOGIN"]));
                            xiSession["DB_DIALOG_SUCCESS"] = "0";
                            return ActionResult.Success;
                        }
                    }

                    cmdText = @"DECLARE @sqlexec nvarchar (200);
                        DECLARE @default_data_path nvarchar(1000)

                        SET @default_data_path = NULL 
                        SET @sqlexec = N'use [master];select TOP 1 @data_path=physical_name from sys.database_files where type=0;';

                        EXEC sp_executesql @sqlexec, N'@data_path nvarchar(max) OUTPUT',@data_path=@default_data_path OUTPUT;

                        SET @default_data_path=REVERSE(STUFF(REVERSE(@default_data_path),1,CHARINDEX('\',REVERSE(@default_data_path)),''))

                        SELECT @default_data_path as [path]";

                    using (SqlCommand sqlCmd = new SqlCommand(cmdText, connection))
                    {
                        object nRet = sqlCmd.ExecuteScalar();

                        if (nRet != null)
                        {
                            xiSession["SQLSERVERPATH"] = nRet.ToString();
                            return ActionResult.Success;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                xiSession["DB_DIALOG_SUCCESS"] = "0";
                xiSession["DB_CONNECTION_SUCCESS"] = "0";
                MessageBox.Show(
                    string.Format("Ошибка подключения к БД ({0}), ошибка: {1}.",
                        fillConnectionString, ex.Message));
            }

            return ActionResult.Success;
        }

        [CustomAction]
        public static ActionResult CheckDbDialogWebMode(Session xiSession)
        {
            //System.Diagnostics.Debugger.Launch();

            xiSession["DB_DIALOG_SUCCESS"] = "1";

            string connectionString = "Data Source={0};Initial Catalog={1};User ID={2};Password={3}";
            string fillConnectionString =
                string.Format(connectionString,
                    xiSession["DB_SERVER_NAME"],
                    xiSession["DB_NAME"],
                    xiSession["DB_LOGIN"],
                    xiSession["DB_PASSWORD"]);

            try
            {
                using (var connection = new SqlConnection(fillConnectionString))
                {
                    connection.Open();

                    xiSession["DB_DIALOG_SUCCESS"] = connection.State == ConnectionState.Open ? "1" : "0";
                }
            }
            catch (Exception ex)
            {
                xiSession["DB_DIALOG_SUCCESS"] = "0";
                MessageBox.Show(
                    string.Format("Ошибка подключения к БД ({0}), ошибка: {1}.",
                        fillConnectionString, ex.Message));
            }

            return ActionResult.Success;
        }

        [CustomAction]
        public static ActionResult CheckIisSiteDialog(Session xiSession)
        {
            //System.Diagnostics.Debugger.Launch();

            xiSession["IIS_DIALOG_SUCCESS"] = "1";

            try
            {
                using (ServerManager serverManager = new ServerManager())
                {
                    if (serverManager.Sites
                        .Any(w => w.Name.ToLower() == xiSession["FooApp_SITE_WEB_APP_NAME"].ToLower()))
                    {
                        MessageBox.Show(string.Format("Сайт '{0}' уже существует.",
                                xiSession["FooApp_SITE_WEB_APP_NAME"]));
                        xiSession["IIS_DIALOG_SUCCESS"] = "0";
                        return ActionResult.Success;
                    }

                    if (serverManager.ApplicationPools
                        .Any(w => w.Name.ToLower() == xiSession["FooApp_SITE_APP_POOL_NAME"].ToLower()))
                    {
                        MessageBox.Show(string.Format("Пул приложений '{0}' уже существует.",
                                xiSession["FooApp_SITE_APP_POOL_NAME"]));
                        xiSession["IIS_DIALOG_SUCCESS"] = "0";
                        return ActionResult.Success;
                    }
                }
            }
            catch (Exception ex)
            {
                xiSession["IIS_DIALOG_SUCCESS"] = "0";
                MessageBox.Show(
                    string.Format("Ошибка подключения к IIS. Ошибка: {0}.", ex.Message));
            }

            return ActionResult.Success;
        }

        [CustomAction]
        public static ActionResult CheckIisLiveDemoSiteDialog(Session xiSession)
        {
            //System.Diagnostics.Debugger.Launch();

            xiSession["IIS_DIALOG_SUCCESS"] = "1";

            try
            {
                using (ServerManager serverManager = new ServerManager())
                {
                    if (serverManager.Sites
                        .Any(w => w.Name.ToLower() == xiSession["LIVE_DEMO_SITE_WEB_APP_NAME"].ToLower()))
                    {
                        MessageBox.Show(string.Format("Сайт '{0}' уже существует.",
                                xiSession["LIVE_DEMO_SITE_WEB_APP_NAME"]));
                        xiSession["IIS_DIALOG_SUCCESS"] = "0";
                        return ActionResult.Success;
                    }

                    if (serverManager.ApplicationPools
                        .Any(w => w.Name.ToLower() == xiSession["LIVE_DEMO_SITE_APP_POOL_NAME"].ToLower()))
                    {
                        MessageBox.Show(string.Format("Пул приложений '{0}' уже существует.",
                                xiSession["LIVE_DEMO_SITE_APP_POOL_NAME"]));
                        xiSession["IIS_DIALOG_SUCCESS"] = "0";
                        return ActionResult.Success;
                    }
                }
            }
            catch (Exception ex)
            {
                xiSession["IIS_DIALOG_SUCCESS"] = "0";
                MessageBox.Show(
                    string.Format("Ошибка подключения к IIS. Ошибка: {0}.", ex.Message));
            }

            return ActionResult.Success;
        }

        [CustomAction]
        public static ActionResult CheckIisStageDemoSiteDialog(Session xiSession)
        {
            //System.Diagnostics.Debugger.Launch();

            xiSession["IIS_DIALOG_SUCCESS"] = "1";

            try
            {
                using (ServerManager serverManager = new ServerManager())
                {
                    if (serverManager.Sites
                        .Any(w => w.Name.ToLower() == xiSession["STAGE_DEMO_SITE_WEB_APP_NAME"].ToLower()))
                    {
                        MessageBox.Show(string.Format("Сайт '{0}' уже существует.",
                                xiSession["STAGE_DEMO_SITE_WEB_APP_NAME"]));
                        xiSession["IIS_DIALOG_SUCCESS"] = "0";
                        return ActionResult.Success;
                    }

                    if (serverManager.ApplicationPools
                        .Any(w => w.Name.ToLower() == xiSession["STAGE_DEMO_SITE_APP_POOL_NAME"].ToLower()))
                    {
                        MessageBox.Show(string.Format("Пул приложений '{0}' уже существует.",
                                xiSession["STAGE_DEMO_SITE_APP_POOL_NAME"]));
                        xiSession["IIS_DIALOG_SUCCESS"] = "0";
                        return ActionResult.Success;
                    }
                }
            }
            catch (Exception ex)
            {
                xiSession["IIS_DIALOG_SUCCESS"] = "0";
                MessageBox.Show(
                    string.Format("Ошибка подключения к IIS. Ошибка: {0}.", ex.Message));
            }

            return ActionResult.Success;
        }

        [CustomAction]
        public static ActionResult CheckIisStaticSiteDialog(Session xiSession)
        {
            //System.Diagnostics.Debugger.Launch();

            xiSession["IIS_DIALOG_SUCCESS"] = "1";

            try
            {
                using (ServerManager serverManager = new ServerManager())
                {
                    if (serverManager.Sites
                        .Any(w => w.Name.ToLower() == xiSession["STATIC_SITE_WEB_APP_NAME"].ToLower()))
                    {
                        MessageBox.Show(string.Format("Сайт '{0}' уже существует.",
                                xiSession["STATIC_SITE_WEB_APP_NAME"]));
                        xiSession["IIS_DIALOG_SUCCESS"] = "0";
                        return ActionResult.Success;
                    }

                    if (serverManager.ApplicationPools
                        .Any(w => w.Name.ToLower() == xiSession["STATIC_SITE_APP_POOL_NAME"].ToLower()))
                    {
                        MessageBox.Show(string.Format("Пул приложений '{0}' уже существует.",
                                xiSession["STATIC_SITE_APP_POOL_NAME"]));
                        xiSession["IIS_DIALOG_SUCCESS"] = "0";
                        return ActionResult.Success;
                    }
                }
            }
            catch (Exception ex)
            {
                xiSession["IIS_DIALOG_SUCCESS"] = "0";
                MessageBox.Show(
                    string.Format("Ошибка подключения к IIS. Ошибка: {0}.", ex.Message));
            }

            return ActionResult.Success;
        }

        [CustomAction]
        public static ActionResult FillSqlServersComboBox(Session xiSession)
        {
            //System.Diagnostics.Debugger.Launch();

            string instances = GetFullValue(@"SOFTWARE\Microsoft\Microsoft SQL Server", "InstalledInstances");

            if (!string.IsNullOrEmpty(instances))
            {
                var items = instances.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);

                if (items.Length == 0)
                {
                    if (MessageBox.Show("SQL Server не установлен на данном компьютере.", "Ошибка", MessageBoxButtons.OK) == DialogResult.OK)
                    {
                        return ActionResult.Failure;
                    }
                }

                foreach (var item in items)
                {
                    string value = item;

                    if (value == "MSSQLSERVER")
                    {
                        value = xiSession["ComputerName"];
                    }
                    else
                    {
                        value = xiSession["ComputerName"] + "\\" + item;
                    }

                    int order = MaxOrder(xiSession, "ComboBox", "SQL_SERVERS");
                    order++;

                    int rowCount = xiSession.Database.CountRows("ComboBox", "(`Property`='SQL_SERVERS' AND `Value`='" + value + "')");

                    if (rowCount == 0)
                    {
                        InsertRecord(xiSession, "ComboBox",
                            new Object[] {
                            "SQL_SERVERS",
                            order,
                            value,
                            value});
                    }
                }

                xiSession["SQL_SERVERS"] = items.First() == "MSSQLSERVER" ?
                    xiSession["ComputerName"] :
                    xiSession["ComputerName"] + "\\" + items.First();
            }

            return ActionResult.Success;
        }

        [CustomAction]
        public static ActionResult CheckPowerShell(Session xiSession)
        {
            //System.Diagnostics.Debugger.Launch();

            var psPath = GetFullValue(
                @"SOFTWARE\Microsoft\PowerShell\1\ShellIds\Microsoft.PowerShell", "Path", false);

            xiSession["POWERSHELLEXE"] = psPath;

            var isKey = IsKey(
                @"SOFTWARE\Microsoft\PowerShell\1\ShellIds\Microsoft.SqlServer.Management.PowerShell.sqlps130",
                RegistryView.Registry32);

            if (!isKey)
            {
                isKey = IsKey(
                    @"SOFTWARE\Microsoft\PowerShell\1\ShellIds\Microsoft.SqlServer.Management.PowerShell.sqlps130",
                    RegistryView.Registry64);
            }

            if (isKey)
            {
                xiSession["SQLPS"] = "1";
            }
            else
            {
                xiSession["SQLPS"] = "";
            }

            return ActionResult.Success;
        }

        [CustomAction]
        public static ActionResult ParseIisMagorVersionToInt(Session xiSession)
        {
            string ver = xiSession["IISMAJORVERSION"];

            ver = ver.Replace("#", "");

            xiSession["IISMAJORVERSION_INT"] = ver;

            return ActionResult.Success;
        }

        [CustomAction]
        public static ActionResult CheckSqlPowerShell(Session xiSession)
        {
            //System.Diagnostics.Debugger.Launch();

            var key = @"SOFTWARE\Microsoft\PowerShell\1\ShellIds\Microsoft.SqlServer.Management.PowerShell.sqlps{0}0";

            string connectionString = "Initial Catalog=master;Data Source={0};persist security info=True; Integrated Security=SSPI;";
            string fillConnectionString =
                string.Format(connectionString,
                    xiSession["DB_SERVER_NAME"]);

            try
            {
                using (var connection = new SqlConnection(fillConnectionString))
                {
                    connection.Open();

                    string cmdText = @"select CAST(LEFT(CAST(SERVERPROPERTY('ProductVersion') AS NVARCHAR(MAX)),
                        CHARINDEX('.',CAST(SERVERPROPERTY('ProductVersion') AS NVARCHAR(MAX))) - 1) AS INT)";

                    using (SqlCommand sqlCmd = new SqlCommand(cmdText, connection))
                    {
                        object nRet = sqlCmd.ExecuteScalar();

                        if (nRet != null)
                        {
                            int majorVersion = 0;
                            int.TryParse(nRet.ToString(), out majorVersion);

                            key = string.Format(key, majorVersion);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                xiSession["SQLPS"] = "";
                xiSession.Log(
                    string.Format("Ошибка подключения к БД ({0}), ошибка: {1}.",
                        fillConnectionString, ex.Message));
            }

            var isKey = IsKey(
                key,
                RegistryView.Registry32);

            if (!isKey)
            {
                isKey = IsKey(
                    key,
                    RegistryView.Registry64);
            }

            if (isKey)
            {
                xiSession["SQLPS"] = "1";
            }
            else
            {
                xiSession["SQLPS"] = "";
            }

            return ActionResult.Success;
        }

        private static bool IsKey(string name, RegistryView viewType)
        {
            var registryKey = RegistryKey.OpenBaseKey(
                RegistryHive.LocalMachine, viewType);

            var lKey = registryKey.OpenSubKey(name);

            return lKey != null;
        }

        private static RegistryKey GetKey(string name, RegistryView viewType)
        {
            var registryKey = RegistryKey.OpenBaseKey(
                RegistryHive.LocalMachine, viewType);

            var lKey = registryKey.OpenSubKey(name);

            return lKey;
        }

        private static string GetValue(string path, string name)
        {
            var lKey = IsKey(path, RegistryView.Registry32);

            RegistryKey key = null;
            if (!lKey)
            {
                lKey = IsKey(path, RegistryView.Registry64);

                if (!lKey)
                {
                    key = GetKey(path, RegistryView.Registry64);
                }
            }
            else
            {
                key = GetKey(path, RegistryView.Registry32);
            }

            if (key != null)
            {
                return key.GetValue(name, string.Empty, RegistryValueOptions.None).ToString();
            }

            return string.Empty;
        }

        private static string GetFullValue(string path, string name, bool isConcat = true)
        {
            string result = string.Empty;

            var lKey = IsKey(path, RegistryView.Registry32);

            if (lKey)
            {
                result = GetValue(path, name, RegistryView.Registry32);
            }

            if (!isConcat)
            {
                lKey = IsKey(path, RegistryView.Registry64);

                if (lKey)
                {
                    result = GetValue(path, name, RegistryView.Registry64);
                }

                return result;
            }

            lKey = IsKey(path, RegistryView.Registry64);

            if (lKey)
            {
                var key = GetKey(path, RegistryView.Registry64);
                if (key != null)
                {
                    var value = key.GetValue(name, string.Empty, RegistryValueOptions.None);

                    if (value is String)
                    {
                        result += "," + key.GetValue(name, string.Empty, RegistryValueOptions.None).ToString();
                    }
                    else if (value is string[])
                    {
                        string[] array = key.GetValue(name, string.Empty, RegistryValueOptions.None) as string[];

                        result += "," + string.Join(",", array);
                    }
                    else
                    {
                        result += "," + key.GetValue(name, string.Empty, RegistryValueOptions.None).ToString();
                    }
                }
            }

            return result;
        }

        private static string GetValue(string path, string name, RegistryView view)
        {
            var key = GetKey(path, view);
            var result = string.Empty;

            if (key != null)
            {
                var value = key.GetValue(name, string.Empty, RegistryValueOptions.None);

                if (value is String)
                {
                    result = key.GetValue(name, string.Empty, RegistryValueOptions.None).ToString();
                }
                else if (value is string[])
                {
                    string[] array = key.GetValue(name, string.Empty, RegistryValueOptions.None) as string[];

                    result = string.Join(",", array);
                }
                else
                {
                    result = key.GetValue(name, string.Empty, RegistryValueOptions.None).ToString();
                }
            }

            return result;
        }

        private static void InsertRecord(Session session, string tableName, Object[] objects)
        {
            var db = session.Database;
            string sqlInsertString = db.Tables[tableName].SqlInsertString + " TEMPORARY";

            //            session.Message(InstallMessage.Info, new Record { FormatString = "InsertRecord does sql: " + sqlInsertString });

            var view = db.OpenView(sqlInsertString);
            view.Execute(new Record(objects));

            view.Close();
        }

        private static int MaxOrder(Session session, string tableName, string property)
        {
            string query = session.Database.Tables[tableName].SqlSelectString;

            var view = session.Database.OpenView(query + " WHERE (`Property`='" + property + "')");
            view.Execute();
            var items = view.GetEnumerator();
            int value = 0;
            while (items.MoveNext())
            {
                int order = int.Parse(items.Current["Order"].ToString());
                if (order > value)
                {
                    value = order;
                }
            }

            return value;
        }


    }
}
