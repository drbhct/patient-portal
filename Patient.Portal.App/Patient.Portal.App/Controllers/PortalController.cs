using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Patient.Portal.App.CrossCuttingConcerns;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Threading.Tasks;

namespace Patient.Portal.App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortalController : ControllerBase
    {
        [HttpGet("findpatientportalsession/{facilityId}/{patientId}")]
        public async Task<IActionResult> FindPatientPortalSession(int facilityId,int patientId)
        {
            var svc = new PortalWcf.PortalClient(PortalWcf.PortalClient.EndpointConfiguration.BasicHttpBinding_IPortal);
            using (var scope = new OperationContextScope(svc.InnerChannel))
            {
                OperationContext.Current.OutgoingMessageHeaders.Add(WcfBinding.GetApiKeyHeader(WcfBinding.ApiKey));

                var error = "";
                var request = new PortalWcf.FindPatientPortalSessionRequest(facilityId, patientId, error);
                var result = await svc.FindPatientPortalSessionAsync(request);
                return Ok(result);
            }
        }
    }
}
