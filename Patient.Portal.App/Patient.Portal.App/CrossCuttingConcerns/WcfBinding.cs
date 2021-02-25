using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.Threading.Tasks;

namespace Patient.Portal.App.CrossCuttingConcerns
{
    public static class WcfBinding
    {
        public const string ApiKey = "vA5Ip4evrWqVcjQkQ5tLDcte8rOb8mbWP9W5MrtKknR3TGTGkbrEo7F0C7Wib2Ui7DtyojQPr7w45L2Bpa5gdNl66EMExqWjvmYM";
        public static MessageHeader GetApiKeyHeader(string apiKey)
        {
            dynamic userIdHeader = new MessageHeader<string>(apiKey);
            return userIdHeader.GetUntypedHeader("ApiKey", "");
        }
    }
}
