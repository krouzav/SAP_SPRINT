using sgc as my from '../db/data-model';

service SGCService {
  entity Response @insertonly as projection on my.Response;
  entity Screen @readonly as projection on my.Screen;
  entity Params as projection on my.Params;
}