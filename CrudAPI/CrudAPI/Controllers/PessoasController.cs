using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudAPI
{
    [ApiController]
    [Route("v1/people")]
    public class PessoasController : ControllerBase
    {
        private readonly Context _context;

        public PessoasController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetAllAsync()
        {
            return await _context.Pessoas.ToListAsync();
        }

        [HttpGet("{pessoaId}")]
        public async Task<ActionResult<Pessoa>> GetPeopleForIdAsync(int pessoaId)
        {
            Pessoa pessoa = await _context.Pessoas.FindAsync(pessoaId);

            if(pessoa == null)
            {
                return NotFound();
            }

            return pessoa;
        }

        [HttpPost]
        public async Task<ActionResult<Pessoa>> SavePeopleAsync(Pessoa pessoa)
        {
           await _context.Pessoas.AddAsync(pessoa);
           await _context.SaveChangesAsync();

           return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdatePeopleAsync(Pessoa pessoa)
        {
            _context.Pessoas.Update(pessoa);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{pessoaId}")]
        public async Task<ActionResult> RemovePeopleAsync(int pessoaId)
        {
            Pessoa pessoa = await _context.Pessoas.FindAsync(pessoaId);
            if(pessoa == null){
                return NotFound();
            }
            _context.Remove(pessoa);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}